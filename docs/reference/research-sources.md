# Research Sources & Resources

Reference file for Sage (Content Developer) — research sources discovered during people queue processing.

---

## Primary Biography Sources

| Site | URL | Best For |
|------|-----|----------|
| **Todo Tango** | todotango.com/english/artists/biography/ | Definitive bios, dates, career timelines |
| **Tangology 101** | tangology101.com | In-depth orchestra/musician analysis |
| **TangoTunes** | tangotunes.com/en/orquestas/ | Orchestra discographies, recordings |
| **Tango Allegria** | tangoallegria.it/en/ | Italian site with good bios |
| **El Portal del Tango** | elportaldeltango.com | General bios |
| **VeryTango Store** | verytangostore.com/legends/ | Legends section with bios |

## Dancer-Specific Sources

| Site | URL | Best For |
|------|-----|----------|
| **030tango** | 030tango.com/dancer/ | Berlin-based dancer profiles |
| **Ultimate Tango** | ultimatetango.com/blog/ | Dancer articles, history |
| **Tango.am** | tango.am/biography-* | Armenian site, good bios |
| **Milonga Press** | milongapress.com/tango-masters/ | Book excerpts, detailed bios |
| **Tanichezini** | luisazini.com/tanichezini/ | Graciela González bio |

## Style-Specific Sources

| Site | URL | Best For |
|------|-----|----------|
| **Urquiza.com** | urquiza.com | Villa Urquiza style history |
| **Tango Voice** | tangovoice.wordpress.com | Style analysis, history |
| **Tanguito UK** | tanguito.co.uk/blog/ | London school blog |

## Quote Sources

| Site | URL | Notes |
|------|-----|-------|
| **AZ Quotes** | azquotes.com/author/ | Search by name |
| **TangoMojo** | tangomojo.com | Gavito quotes |

## Documentary/Film References

| Title | Subject | Notes |
|-------|---------|-------|
| Un Tango Más (2015) | Copes & Nieves | German Kral director |
| The Tango Lesson (1997) | Pablo Verón | Sally Potter |
| Tango Argentino show | Multiple dancers | 1983 Paris, 1985 Broadway |

---

## Local File Paths

### Queue System
```
/docs/queues/people-queue.json          # Active queue
/docs/workflows/people-queue-workflow.md # Processing workflow
```

### Content Output
```
/public/tango-papers/people/            # Profile markdown files
/public/tango-papers/index/master-index.json  # Entity index
/src/app/data/peopleData.js             # JS data registry
```

### Session Management
```
/docs/handoffs/sage/                    # Session handoffs
/docs/inbox/                            # Incoming research
/docs/outbox/                           # Prompts for Research LLM
/docs/processed/                        # Completed research docs
```

---

## Search Patterns That Work

### For Musicians
```
"[Name]" tango orchestra biography born died
"[Name]" tango [instrument] quotes philosophy
```

### For Dancers
```
"[Name]" tango dancer biography partner milonguero
"[Name]" tango [generation] teacher
```

### For Dates/Facts
```
"[Name]" "[Year]" death obituary tango
"[Name]" "[Partner name]" tango
```

---

## Notes

- Wikipedia often returns 403; use alternative sources
- Todo Tango URLs sometimes redirect to wrong artist; verify content
- For living dancers, check for current teaching/performance activity
- Cross-reference birth years (sources often conflict)
- For quotes, search "[Name]" quotes tango

---

*Last updated: 2026-02-15*
