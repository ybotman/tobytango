#!/bin/bash
# find-missing-profiles.sh
# Scans all tango papers and profiles to find people mentioned but not profiled
# Usage: ./scripts/find-missing-profiles.sh

PAPERS_DIR="public/tango-papers"
QUEUE_FILE="docs/queues/people-queue.json"

echo "=== Finding Mentioned-But-Not-Profiled People ==="
echo ""

# Get list of existing profile slugs from queue (both completed and pending)
EXISTING_SLUGS=$(cat "$QUEUE_FILE" | grep '"slug"' | sed 's/.*"slug": "\([^"]*\)".*/\1/' | tr '\n' '|' | sed 's/|$//')

# Also get display names to avoid duplicates
EXISTING_NAMES=$(cat "$QUEUE_FILE" | grep '"displayName"' | sed 's/.*"displayName": "\([^"]*\)".*/\1/' | tr '\n' '|' | sed 's/|$//')

echo "Existing profiles: $(echo "$EXISTING_SLUGS" | tr '|' '\n' | wc -l | tr -d ' ')"
echo ""

# Find all markdown files
echo "Scanning markdown files for person mentions..."
echo ""

# Look for patterns like:
# - Names after "with" or "partner"
# - Names in "studied with/under"
# - Names in "taught by"
# - Names after "worked with"
# - Bold names **Name**
# - Link references [Name](/people/...)

# Extract potential names (2-3 capitalized words together)
# Focus on patterns that indicate people

echo "=== HIGH-PRIORITY: Frequently Mentioned ==="
echo "(People mentioned 3+ times across all papers)"
echo ""

# Count mentions of capitalized name patterns
grep -rhoE '\b[A-Z][a-záéíóú]+\s+[A-Z][a-záéíóú]+(\s+[A-Z][a-záéíóú]+)?\b' "$PAPERS_DIR" 2>/dev/null | \
    sort | uniq -c | sort -rn | \
    head -50 | \
    while read count name; do
        # Skip if already profiled (check slug form)
        slug=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[áà]/a/g; s/[éè]/e/g; s/[íì]/i/g; s/[óò]/o/g; s/[úù]/u/g')
        if ! echo "$EXISTING_SLUGS" | grep -qi "$slug"; then
            # Skip common non-person terms
            if ! echo "$name" | grep -qiE "Buenos Aires|Argentine Tango|Golden Age|Villa Urquiza|San Martín|Teatro Colón|Tango Argentino|Nueva York|New York|Los Angeles|United States|Latin Grammy|World Championship|Orquesta Típica"; then
                if [ "$count" -ge 3 ]; then
                    echo "  $count mentions: $name"
                fi
            fi
        fi
    done

echo ""
echo "=== PARTNER MENTIONS ==="
echo "(Found in 'partner', 'with', 'and' contexts)"
echo ""

grep -rhoE '(partner|with|and)\s+[A-Z][a-záéíóú]+\s+[A-Z][a-záéíóú]+' "$PAPERS_DIR" 2>/dev/null | \
    sed 's/^(partner|with|and)\s*//' | \
    sort | uniq -c | sort -rn | \
    head -20 | \
    while read count name; do
        slug=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[áà]/a/g; s/[éè]/e/g; s/[íì]/i/g; s/[óò]/o/g; s/[úù]/u/g')
        if ! echo "$EXISTING_SLUGS" | grep -qi "$slug"; then
            echo "  $count: $name"
        fi
    done

echo ""
echo "=== TEACHER/STUDENT MENTIONS ==="
echo "(Found in 'taught', 'studied', 'learned' contexts)"
echo ""

grep -rhoE '(taught|studied|learned|trained)\s+(by|with|under|from)?\s*[A-Z][a-záéíóú]+\s+[A-Z][a-záéíóú]+' "$PAPERS_DIR" 2>/dev/null | \
    sed 's/^[a-z]*\s*[a-z]*\s*//' | \
    sort | uniq -c | sort -rn | \
    head -20 | \
    while read count name; do
        slug=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[áà]/a/g; s/[éè]/e/g; s/[íì]/i/g; s/[óò]/o/g; s/[úù]/u/g')
        if ! echo "$EXISTING_SLUGS" | grep -qi "$slug"; then
            echo "  $count: $name"
        fi
    done

echo ""
echo "=== BROKEN LINKS (referenced but no profile) ==="
echo ""

# Find links to /people/ that might be broken
grep -rhoE '\[([^\]]+)\]\(/people/[^)]+\)' "$PAPERS_DIR" 2>/dev/null | \
    sed 's/\[\([^]]*\)\].*/\1/' | \
    sort -u | \
    while read name; do
        slug=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[áà]/a/g; s/[éè]/e/g; s/[íì]/i/g; s/[óò]/o/g; s/[úù]/u/g')
        if ! echo "$EXISTING_SLUGS" | grep -qi "$slug"; then
            echo "  - $name"
        fi
    done

echo ""
echo "=== SUMMARY ==="
echo "Run this script periodically to find new people to add to the queue."
echo "To add someone: tell Sage 'Add [Name] - [context]'"
