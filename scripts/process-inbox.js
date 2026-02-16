#!/usr/bin/env node

/**
 * process-inbox.js
 *
 * Processes completed research from /docs/inbox/ into the live site.
 * - Validates markdown structure
 * - Copies to /public/tango-papers/people/{slug}.md
 * - Updates peopleData.js status
 * - Updates people-queue.json
 * - Moves processed file to /docs/processed/
 *
 * Usage:
 *   node scripts/process-inbox.js                     # Process all inbox files
 *   node scripts/process-inbox.js --slug gustavo-naveira  # Process one
 *   node scripts/process-inbox.js --dry-run           # Preview without changes
 *   node scripts/process-inbox.js --validate-only     # Just validate, don't write
 */

const fs = require('fs');
const path = require('path');

// Paths
const ROOT = path.join(__dirname, '..');
const INBOX_PATH = path.join(ROOT, 'docs/inbox');
const PROCESSED_PATH = path.join(ROOT, 'docs/processed');
const PEOPLE_PAPERS_PATH = path.join(ROOT, 'public/tango-papers/people');
const QUEUE_PATH = path.join(ROOT, 'docs/queues/people-queue.json');
const PEOPLE_DATA_PATH = path.join(ROOT, 'src/app/data/peopleData.js');

// Parse command line arguments
const args = process.argv.slice(2);
const targetSlug = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;
const dryRun = args.includes('--dry-run');
const validateOnly = args.includes('--validate-only');
const verbose = args.includes('--verbose') || args.includes('-v');

/**
 * Find inbox files that look like person profiles
 */
function findInboxFiles() {
  if (!fs.existsSync(INBOX_PATH)) {
    return [];
  }

  const files = fs.readdirSync(INBOX_PATH);

  // Match files like: gustavo-naveira.md, chicho-frumboli.md
  // Skip files that start with other patterns
  return files
    .filter(f => f.endsWith('.md'))
    .filter(f => !f.startsWith('prompt-'))
    .filter(f => !f.startsWith('tango-'))  // Skip research docs like tango-movers-shakers
    .filter(f => !f.includes('artifact'))  // Skip compass artifacts
    .map(f => ({
      filename: f,
      slug: f.replace('.md', ''),
      filepath: path.join(INBOX_PATH, f)
    }));
}

/**
 * Validate a person profile markdown file
 * Returns { valid: boolean, errors: string[], warnings: string[] }
 */
function validateProfile(content, slug) {
  const errors = [];
  const warnings = [];

  // Check for YAML frontmatter
  if (!content.startsWith('---')) {
    errors.push('Missing YAML frontmatter (must start with ---)');
  } else {
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd === -1) {
      errors.push('Unterminated YAML frontmatter');
    } else {
      const frontmatter = content.slice(3, frontmatterEnd).trim();

      // Check required fields
      const requiredFields = ['id', 'name', 'type', 'status', 'lastUpdated'];
      for (const field of requiredFields) {
        if (!frontmatter.includes(`${field}:`)) {
          errors.push(`Missing required frontmatter field: ${field}`);
        }
      }

      // Check id matches slug
      const idMatch = frontmatter.match(/^id:\s*(.+)$/m);
      if (idMatch && idMatch[1].trim() !== slug) {
        warnings.push(`Frontmatter id "${idMatch[1].trim()}" doesn't match filename slug "${slug}"`);
      }
    }
  }

  // Check for required sections
  const requiredSections = ['# ', '## Biography', '## Career Highlights', '## Notable Quotes'];
  for (const section of requiredSections) {
    if (!content.includes(section)) {
      warnings.push(`Missing section: ${section}`);
    }
  }

  // Check for Videos or Recordings table
  if (!content.includes('## Videos') && !content.includes('## Recordings')) {
    warnings.push('Missing Videos or Recordings section');
  }

  // Check for at least some YouTube links (if Videos section exists)
  if (content.includes('## Videos')) {
    const youtubeLinks = (content.match(/youtube\.com\/watch/g) || []).length;
    if (youtubeLinks < 3) {
      warnings.push(`Only ${youtubeLinks} YouTube links found (recommend 5-8)`);
    }
  }

  // Check for quotes
  const quoteCount = (content.match(/^>\s*"/gm) || []).length;
  if (quoteCount < 2) {
    warnings.push(`Only ${quoteCount} quotes found (recommend 3+)`);
  }

  // Check for AI disclaimer
  if (!content.includes('Generated with AI assistance') &&
      !content.includes('AI assistance')) {
    warnings.push('Missing AI assistance disclaimer');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Extract the slug/id from frontmatter
 */
function extractSlugFromContent(content) {
  const match = content.match(/^id:\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Copy profile to public folder
 */
function publishProfile(content, slug) {
  const destPath = path.join(PEOPLE_PAPERS_PATH, `${slug}.md`);

  if (dryRun || validateOnly) {
    console.log(`[DRY RUN] Would write: public/tango-papers/people/${slug}.md`);
    return destPath;
  }

  // Ensure directory exists
  if (!fs.existsSync(PEOPLE_PAPERS_PATH)) {
    fs.mkdirSync(PEOPLE_PAPERS_PATH, { recursive: true });
  }

  fs.writeFileSync(destPath, content);
  return destPath;
}

/**
 * Update peopleData.js to mark status as published
 */
function updatePeopleData(slug) {
  if (dryRun || validateOnly) {
    console.log(`[DRY RUN] Would update peopleData.js: ${slug} -> published`);
    return;
  }

  const content = fs.readFileSync(PEOPLE_DATA_PATH, 'utf8');

  // Find the entry for this slug and update status
  // Look for: slug: "gustavo-naveira", ... status: "pending"
  const slugPattern = new RegExp(
    `(slug:\\s*["']${slug}["'][^}]*status:\\s*["'])pending(["'])`,
    's'
  );

  if (!slugPattern.test(content)) {
    // Try alternate: status might come before slug
    const altPattern = new RegExp(
      `(status:\\s*["'])pending(["'][^}]*slug:\\s*["']${slug}["'])`,
      's'
    );
    if (!altPattern.test(content)) {
      console.log(`  Warning: Could not find pending entry for ${slug} in peopleData.js`);
      return;
    }
    const updated = content.replace(altPattern, '$1published$2');
    fs.writeFileSync(PEOPLE_DATA_PATH, updated);
    return;
  }

  const updated = content.replace(slugPattern, '$1published$2');
  fs.writeFileSync(PEOPLE_DATA_PATH, updated);
}

/**
 * Update the queue to mark as completed
 */
function updateQueue(slug) {
  if (dryRun || validateOnly) {
    console.log(`[DRY RUN] Would update queue: ${slug} -> completed`);
    return;
  }

  const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));

  const entry = queue.queue.find(p => p.slug === slug);
  if (entry) {
    entry.status = 'completed';
    entry.completedDate = new Date().toISOString().split('T')[0];
  }

  // Update stats
  queue.stats = {
    total: queue.queue.length,
    pending: queue.queue.filter(p => p.status === 'pending').length,
    prompt_ready: queue.queue.filter(p => p.status === 'prompt_ready').length,
    in_progress: queue.queue.filter(p => p.status === 'in_progress').length,
    completed: queue.queue.filter(p => p.status === 'completed').length,
    blocked: queue.queue.filter(p => p.status === 'blocked').length
  };
  queue.lastUpdated = new Date().toISOString().split('T')[0];

  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n');
}

/**
 * Move processed file to processed folder
 */
function archiveProcessed(sourceFile, slug) {
  if (dryRun || validateOnly) {
    console.log(`[DRY RUN] Would move to: docs/processed/${slug}.md`);
    return;
  }

  // Ensure processed folder exists
  if (!fs.existsSync(PROCESSED_PATH)) {
    fs.mkdirSync(PROCESSED_PATH, { recursive: true });
  }

  const destPath = path.join(PROCESSED_PATH, `${slug}.md`);
  fs.renameSync(sourceFile, destPath);
}

/**
 * Process a single inbox file
 */
function processFile(file) {
  console.log(`\nProcessing: ${file.filename}`);

  // Read content
  const content = fs.readFileSync(file.filepath, 'utf8');

  // Extract slug from content (prefer frontmatter id)
  const contentSlug = extractSlugFromContent(content) || file.slug;

  // Validate
  const validation = validateProfile(content, contentSlug);

  if (validation.errors.length > 0) {
    console.log('  ERRORS:');
    validation.errors.forEach(e => console.log(`    - ${e}`));
  }

  if (validation.warnings.length > 0 && verbose) {
    console.log('  Warnings:');
    validation.warnings.forEach(w => console.log(`    - ${w}`));
  }

  if (!validation.valid) {
    console.log(`  SKIPPED: ${file.filename} has validation errors`);
    return { success: false, slug: contentSlug, errors: validation.errors };
  }

  if (validateOnly) {
    console.log(`  VALID: ${file.filename}`);
    return { success: true, slug: contentSlug, validateOnly: true };
  }

  // Process
  try {
    // 1. Publish to public folder
    publishProfile(content, contentSlug);
    console.log(`  Published: public/tango-papers/people/${contentSlug}.md`);

    // 2. Update peopleData.js
    updatePeopleData(contentSlug);
    console.log(`  Updated: peopleData.js`);

    // 3. Update queue
    updateQueue(contentSlug);
    console.log(`  Updated: queue`);

    // 4. Archive
    archiveProcessed(file.filepath, contentSlug);
    console.log(`  Archived: docs/processed/${contentSlug}.md`);

    return { success: true, slug: contentSlug };
  } catch (error) {
    console.error(`  ERROR: ${error.message}`);
    return { success: false, slug: contentSlug, error: error.message };
  }
}

/**
 * Main execution
 */
function main() {
  console.log('=== Person Profile Inbox Processor ===');

  if (dryRun) {
    console.log('Mode: DRY RUN (no changes will be made)\n');
  } else if (validateOnly) {
    console.log('Mode: VALIDATE ONLY\n');
  }

  // Find inbox files
  let files = findInboxFiles();

  if (files.length === 0) {
    console.log('\nNo person profile files found in docs/inbox/');
    console.log('Expected files like: gustavo-naveira.md, tete-rusconi.md');
    return;
  }

  console.log(`Found ${files.length} potential profile(s) in inbox`);

  // Filter to target if specified
  if (targetSlug) {
    files = files.filter(f => f.slug === targetSlug);
    if (files.length === 0) {
      console.error(`\nTarget slug not found in inbox: ${targetSlug}`);
      process.exit(1);
    }
  }

  // Process each file
  const results = [];
  for (const file of files) {
    const result = processFile(file);
    results.push(result);
  }

  // Summary
  console.log('\n=== Summary ===');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`Processed: ${successful.length}`);
  successful.forEach(r => console.log(`  - ${r.slug}`));

  if (failed.length > 0) {
    console.log(`\nFailed: ${failed.length}`);
    failed.forEach(r => console.log(`  - ${r.slug}: ${r.errors?.join(', ') || r.error}`));
  }

  if (dryRun || validateOnly) {
    console.log('\nNo files were modified.');
  }
}

// Run
main();
