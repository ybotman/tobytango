#!/usr/bin/env node

/**
 * generate-prompts.js
 *
 * Generates research prompts for pending people in the queue.
 * Reads the master prompt template and fills in person-specific data.
 *
 * Usage:
 *   node scripts/generate-prompts.js                    # Generate all pending
 *   node scripts/generate-prompts.js --slug gustavo-naveira  # Generate one
 *   node scripts/generate-prompts.js --dry-run         # Preview without writing
 */

const fs = require('fs');
const path = require('path');

// Paths
const ROOT = path.join(__dirname, '..');
const QUEUE_PATH = path.join(ROOT, 'docs/queues/people-queue.json');
const TEMPLATE_PATH = path.join(ROOT, 'docs/prompts/PERSON-RESEARCH-PROMPT.md');
const PEOPLE_DATA_PATH = path.join(ROOT, 'src/app/data/peopleData.js');
const OUTBOX_PATH = path.join(ROOT, 'docs/outbox');

// Parse command line arguments
const args = process.argv.slice(2);
const targetSlug = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose') || args.includes('-v');

/**
 * Load and parse the people queue
 */
function loadQueue() {
  const content = fs.readFileSync(QUEUE_PATH, 'utf8');
  return JSON.parse(content);
}

/**
 * Load the prompt template
 */
function loadTemplate() {
  return fs.readFileSync(TEMPLATE_PATH, 'utf8');
}

/**
 * Extract peopleData from the JS file using regex to find each entry
 * This is more robust than trying to parse JS as JSON
 */
function loadPeopleData() {
  const content = fs.readFileSync(PEOPLE_DATA_PATH, 'utf8');

  // Find all object blocks that look like people entries
  const people = [];
  const objectPattern = /\{[^{}]*slug:\s*["']([^"']+)["'][^{}]*\}/gs;
  let match;

  while ((match = objectPattern.exec(content)) !== null) {
    const block = match[0];
    const slug = match[1];

    // Extract fields from the block
    const extract = (field) => {
      const pattern = new RegExp(`${field}:\\s*["']([^"']+)["']`);
      const m = block.match(pattern);
      return m ? m[1] : null;
    };

    const extractNull = (field) => {
      const pattern = new RegExp(`${field}:\\s*null`);
      return pattern.test(block) ? null : extract(field);
    };

    const extractArray = (field) => {
      const pattern = new RegExp(`${field}:\\s*\\[([^\\]]+)\\]`);
      const m = block.match(pattern);
      if (!m) return [];
      return m[1].split(',').map(s => s.trim().replace(/["']/g, '')).filter(Boolean);
    };

    people.push({
      slug,
      displayName: extract('displayName'),
      fullName: extract('fullName'),
      type: extract('type'),
      generation: extract('generation'),
      born: extract('born'),
      died: extractNull('died'),
      nationality: extract('nationality'),
      tags: extractArray('tags'),
      summary: extract('summary')
    });
  }

  return people;
}

/**
 * Get full person data by combining queue entry with peopleData
 */
function getPersonData(queueEntry, peopleData) {
  const fullData = peopleData.find(p => p.slug === queueEntry.slug) || {};

  return {
    slug: queueEntry.slug,
    displayName: queueEntry.displayName,
    fullName: fullData.fullName || queueEntry.displayName,
    type: queueEntry.type,
    generation: fullData.generation || null,
    born: fullData.born || null,
    died: fullData.died || null,
    nationality: fullData.nationality || 'Argentine',
    tags: fullData.tags || [],
    summary: fullData.summary || null,
    notes: queueEntry.notes || '',
    status: fullData.died ? 'deceased' : 'active'
  };
}

/**
 * Format person data as markdown block for the prompt
 */
function formatPersonData(person) {
  const lines = [
    `- **Name:** ${person.fullName}`,
    `- **Slug:** ${person.slug}`,
    `- **Type:** ${person.type}`,
    `- **Generation:** ${person.generation || 'unknown'}`,
    `- **Status:** ${person.status}`,
  ];

  if (person.born) {
    lines.push(`- **Born:** ${person.born}`);
  }

  if (person.died) {
    lines.push(`- **Died:** ${person.died}`);
  }

  if (person.nationality) {
    lines.push(`- **Nationality:** ${person.nationality}`);
  }

  if (person.tags && person.tags.length > 0) {
    lines.push(`- **Known Tags:** ${person.tags.join(', ')}`);
  }

  if (person.summary) {
    lines.push(`- **Current Summary:** ${person.summary}`);
  }

  if (person.notes) {
    lines.push(`- **Research Notes:** ${person.notes}`);
  }

  return lines.join('\n');
}

/**
 * Generate a prompt for a single person
 */
function generatePrompt(queueEntry, peopleData, template) {
  const person = getPersonData(queueEntry, peopleData);
  const personDataBlock = formatPersonData(person);

  // Replace the placeholder
  const prompt = template.replace('{{PERSON_DATA}}', personDataBlock);

  return {
    slug: person.slug,
    displayName: person.displayName,
    content: prompt
  };
}

/**
 * Save prompt to outbox
 */
function savePrompt(prompt) {
  const filename = `prompt-person-${prompt.slug}.md`;
  const filepath = path.join(OUTBOX_PATH, filename);

  if (dryRun) {
    console.log(`[DRY RUN] Would write: ${filename}`);
    return filepath;
  }

  // Ensure outbox exists
  if (!fs.existsSync(OUTBOX_PATH)) {
    fs.mkdirSync(OUTBOX_PATH, { recursive: true });
  }

  fs.writeFileSync(filepath, prompt.content);
  return filepath;
}

/**
 * Update queue entry status
 */
function updateQueueStatus(queue, slug, status) {
  const entry = queue.queue.find(p => p.slug === slug);
  if (entry) {
    entry.status = status;
    if (status === 'prompt_ready') {
      entry.promptSentDate = new Date().toISOString().split('T')[0];
    }
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
}

/**
 * Save updated queue
 */
function saveQueue(queue) {
  if (dryRun) {
    console.log('[DRY RUN] Would update queue');
    return;
  }

  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n');
}

/**
 * Main execution
 */
function main() {
  console.log('=== Person Research Prompt Generator ===\n');

  // Load data
  const queue = loadQueue();
  const template = loadTemplate();
  const peopleData = loadPeopleData();

  console.log(`Queue: ${queue.stats.total} people (${queue.stats.pending} pending)`);
  console.log(`PeopleData: ${peopleData.length} entries loaded\n`);

  // Filter to pending items (or specific slug)
  let toProcess;
  if (targetSlug) {
    const entry = queue.queue.find(p => p.slug === targetSlug);
    if (!entry) {
      console.error(`Slug not found in queue: ${targetSlug}`);
      process.exit(1);
    }
    toProcess = [entry];
    console.log(`Processing single: ${targetSlug}`);
  } else {
    toProcess = queue.queue.filter(p => p.status === 'pending');
    console.log(`Processing ${toProcess.length} pending entries`);
  }

  if (toProcess.length === 0) {
    console.log('No pending entries to process.');
    return;
  }

  // Generate prompts
  const generated = [];
  for (const entry of toProcess) {
    const prompt = generatePrompt(entry, peopleData, template);
    const filepath = savePrompt(prompt);
    generated.push({ slug: prompt.slug, filepath });

    if (!dryRun) {
      updateQueueStatus(queue, prompt.slug, 'prompt_ready');
    }

    if (verbose) {
      console.log(`  - ${prompt.displayName} -> ${path.basename(filepath)}`);
    }
  }

  // Save updated queue
  if (!dryRun) {
    saveQueue(queue);
  }

  // Summary
  console.log(`\nGenerated ${generated.length} prompts:`);
  generated.forEach(g => {
    console.log(`  - docs/outbox/prompt-person-${g.slug}.md`);
  });

  if (dryRun) {
    console.log('\n[DRY RUN] No files were written.');
  } else {
    console.log('\nQueue updated. Prompts ready in docs/outbox/');
  }
}

// Run
main();
