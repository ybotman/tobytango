# Research Request: Timeline Event Content

## Context

We are building a Tango History Timeline at tobytango.com. The timeline displays key events as clickable markers. When clicked, each event shows a **popup card** with:

1. **Image** — displayed as banner header (landscape orientation preferred)
2. **Text** — 1-2 paragraphs explaining the event's significance
3. **Optional external links** — for deeper reading

The timeline is educational, aimed at social tango dancers wanting to understand the history. The audience knows basic tango but may not know historical details.

## Technical Requirements

For each event, please provide:

### 1. Description (1-2 paragraphs)
- First paragraph: What happened, when, where
- Second paragraph: Why it mattered to tango history
- May include markdown links to reputable external sources (Wikipedia, tango archives, museum sites)
- Tone: Informative but engaging, not academic

### 2. Image URL
- Must be a **shareable hotlink** (Wikimedia Commons preferred)
- Direct URL to the image file (e.g., `https://upload.wikimedia.org/wikipedia/commons/...`)
- Landscape orientation preferred (will be used as banner)
- Must be Creative Commons or public domain
- If no appropriate image exists, note "NO_IMAGE_AVAILABLE"

---

## Events Needing Content

### Recording/Music Events

**1. First Recordings (1905-1910)**
- Key moment: Angel Villoldo records "El Choclo" (1906)
- Need: Context on early recording technology, what these recordings meant

**2. D'Arienzo Revolution (1935-1938)**
- D'Arienzo returns tango to rhythmic roots after Gardel's death
- Need: What changed musically, why dance floors filled again

---

### Deaths (Pivotal Losses)

**3. Gardel Dies (June 24, 1935)**
- Plane crash in Medellín, Colombia
- Need: His significance, the impact of losing "the voice of tango"

**4. Finito Dies (1987)**
- Ramón "Finito" Rivera, best social dancer of 1980s revival
- Need: Who he was, why his early death was significant

**5. Pepito Dies (1996)**
- Pepito Avellaneda, "King of the Milonga"
- Need: His style (orillero), his role in the community

**6. Gavito Dies (2005)**
- Carlos Gavito, theatrical tango master
- Need: His "Forever Tango" fame, his minimalist stage style

**7. Vidort Dies (2006)**
- Ricardo Vidort, "The Last Compadrito"
- Need: What compadrito meant, his teaching legacy in Santa Fe, NM

**8. Pupi & Portalea Die (2007)**
- Both Villa Urquiza pillars died same year
- Need: Their individual contributions, the significance of losing both

**9. Tete Dies (Jan 7, 2010)**
- Pedro "Tete" Rusconi, two days before 74th birthday
- Need: His milonguero style, Pina Bausch collaboration, teaching legacy

---

### Political/Historical Events

**10. Paris Tangomania (1912-1914)**
- Tango conquers Paris, Vatican condemns it
- Need: How it spread, the scandal, fashion impact

**11. Perón Overthrown (1955)**
- Military coup ends Perón era
- Need: Connection between Perón and tango, what changed after

**12. Dirty War (1976-1983)**
- Military junta, curfews, gatherings banned
- Need: How tango was suppressed without being "banned"

**13. Democracy Returns (1983)**
- Alfonsín elected, cultural programs restart
- Need: The immediate impact on milongas and milongueros

**14. Economic Crisis (2001-2002)**
- Peso collapses
- Need: How this affected tango (teacher migration, tango tourism)

**15. COVID Pandemic (2020-2022)**
- Milongas worldwide close
- Need: The devastation, notable losses, how communities adapted

---

### Cultural Milestones

**16. 'Tango Argentino' Show (1983-1985)**
- Paris premiere Nov 11, 1983; Broadway 1985
- Need: Who created it, who was in it, why it changed everything

**17. 'The Tango Lesson' Film (1997)**
- Sally Potter film with Pablo Verón
- Need: Plot, impact on bringing tango to mainstream audiences

**18. Mundial Begins (2003)**
- First Campeonato Mundial de Tango
- Need: The categories (Salón/Escenario), controversy, significance

**19. UNESCO Heritage (Sept 30, 2009)**
- Tango declared Intangible Cultural Heritage
- Need: What this recognition meant, Argentina & Uruguay joint nomination

---

## Output Format

Please provide in this format for each event:

```markdown
## [Event Name]

### Description
[1-2 paragraphs with optional markdown links]

### Image
[Direct URL to shareable image, or NO_IMAGE_AVAILABLE]

### Image Attribution
[Credit line for the image, e.g., "Photo by X, CC BY-SA 4.0"]
```

---

## Priority Order

If time-limited, prioritize:
1. Gardel Dies (iconic)
2. 'Tango Argentino' Show (pivotal)
3. UNESCO Heritage (recent, documented)
4. D'Arienzo Revolution (musical turning point)
5. Tete Dies (well-documented, recent)

Then deaths of major figures, then political events, then others.

---

## Notes

- We will use these images directly via URL (not downloading) — must be stable links
- External links in text should go to authoritative sources
- If there are multiple good image options, provide the best one
- If historical photos are unavailable, a relevant location/memorial photo works
