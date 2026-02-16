#!/usr/bin/env node

/**
 * merge-glossary.js
 *
 * Merges glossary JSON files into master-index.json
 * Avoids duplicates by checking existing IDs
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MASTER_INDEX_PATH = path.join(ROOT, 'public/tango-papers/index/master-index.json');
const GLOSSARY_PATH = path.join(ROOT, 'public/tango-papers/index/glossary');

// Files to merge (in order)
const GLOSSARY_FILES = [
  '01-tango-terms.json',
  '02-orchestras.json',
  '03-singers.json',
  '04-venues.json',
  '05-styles.json'
];

// Transform glossary entity to master-index format
function transformEntity(entity, sourceFile) {
  const transformed = {
    id: entity.id,
    type: entity.type,
    displayName: entity.displayName
  };

  // Add optional fields if present
  if (entity.aliases && entity.aliases.length > 0) {
    transformed.aliases = entity.aliases;
  }
  if (entity.summary) {
    transformed.summary = entity.summary;
  }
  if (entity.definition) {
    transformed.definition = entity.definition;
  }
  if (entity.categories && entity.categories.length > 0) {
    transformed.categories = entity.categories;
  }
  if (entity.relatedTerms && entity.relatedTerms.length > 0) {
    transformed.relatedTerms = entity.relatedTerms;
  }
  if (entity.meta) {
    // Flatten meta fields for orchestras/singers
    if (entity.meta.activeYears) transformed.activeYears = entity.meta.activeYears;
    if (entity.meta.signatureStyle) transformed.signatureStyle = entity.meta.signatureStyle;
    if (entity.meta.notableSingers) transformed.notableSingers = entity.meta.notableSingers;
    if (entity.meta.whyDancersLoveIt) transformed.whyDancersLoveIt = entity.meta.whyDancersLoveIt;
    if (entity.meta.birthDeath) {
      const [born, died] = entity.meta.birthDeath.split('–');
      if (born) transformed.born = born.trim();
      if (died) transformed.died = died.trim();
    }
    if (entity.meta.primaryOrchestras) transformed.primaryOrchestras = entity.meta.primaryOrchestras;
    if (entity.meta.voiceStyle) transformed.voiceStyle = entity.meta.voiceStyle;
    if (entity.meta.location) transformed.location = entity.meta.location;
    if (entity.meta.currentStatus) transformed.currentStatus = entity.meta.currentStatus;
    if (entity.meta.keyCharacteristics) transformed.keyCharacteristics = entity.meta.keyCharacteristics;
    if (entity.meta.notablePractitioners) transformed.notablePractitioners = entity.meta.notablePractitioners;
  }

  // Add source reference
  transformed.appearsIn = [`/tango-papers/index/glossary/${sourceFile}`];
  transformed.status = entity.status || 'complete';

  return transformed;
}

function main() {
  console.log('=== Glossary Merge Tool ===\n');

  // Load master index
  const masterIndex = JSON.parse(fs.readFileSync(MASTER_INDEX_PATH, 'utf8'));
  const existingIds = new Set(masterIndex.entities.map(e => e.id));
  console.log(`Master index: ${existingIds.size} existing entities`);

  let added = 0;
  let skipped = 0;

  // Process each glossary file
  for (const filename of GLOSSARY_FILES) {
    const filepath = path.join(GLOSSARY_PATH, filename);
    if (!fs.existsSync(filepath)) {
      console.log(`  Skipping ${filename} (not found)`);
      continue;
    }

    const glossary = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    const entities = glossary.entities || [];
    console.log(`\nProcessing ${filename}: ${entities.length} entities`);

    for (const entity of entities) {
      if (existingIds.has(entity.id)) {
        skipped++;
        continue;
      }

      const transformed = transformEntity(entity, filename);
      masterIndex.entities.push(transformed);
      existingIds.add(entity.id);
      added++;
    }
  }

  // Update metadata
  masterIndex.version = (parseFloat(masterIndex.version) + 0.1).toFixed(1);
  masterIndex.lastUpdated = new Date().toISOString().split('T')[0];

  // Write updated master index
  fs.writeFileSync(MASTER_INDEX_PATH, JSON.stringify(masterIndex, null, 2) + '\n');

  console.log(`\n=== Summary ===`);
  console.log(`Added: ${added} new entities`);
  console.log(`Skipped: ${skipped} (already existed)`);
  console.log(`Total: ${masterIndex.entities.length} entities`);
  console.log(`Version: ${masterIndex.version}`);
}

main();
