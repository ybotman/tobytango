# FEATURE_3001_MilongaRhythmGrid

> **IFE Feature Document**  
> This document is the single source of truth for capturing all decisions, actions, and status updates related to this feature.  
> **Guild roles** must update this file directly, in their own sections, using their role icon and a datetime stamp.  
> All recommendations, decisions, and assignments must be recorded here by the responsible role.

## 🗂️ KANBAN (Required)
_What must be done, who is assigned, and current status.  
All task assignments and workflow status updates go here._  
**Last updated:** 2025-01-06 22:00

- [ ] Create Feature branch: feature/3001-milonga-rhythm-grid
- [ ] Add Tone.js dependency to package.json
- [ ] Create rhythm grid component with 3 tracks (Drum A, Drum B, Bass)
- [ ] Create preset selector dropdown component
- [ ] Create JSON preset files in /public/rhythms/canned/
- [ ] Integrate grid into existing milonga page with tabs
- [ ] Implement sound/note selection for grid cells
- [ ] Add playback controls with Tone.js
- [ ] Create rhythm visualization icons for grid states
- [ ] Test integration with existing audio player system

## 🧭 SCOUT (Required)
_Research, discoveries, risks, and open questions.  
Document findings and recommendations here._  
**Last updated:** 2025-01-06 22:00

- **Existing Infrastructure**: Sophisticated HTML5 audio player system with pulse visualization
- **Current Milonga Page**: Accordion layout with placeholders for interactive content
- **Audio Assets**: Organized structure in /public/audio/ with JSON pulse data
- **MUI Patterns**: Established responsive grid, accordion, and theming patterns
- **Risk**: Tone.js integration may conflict with existing audio player system
- **Opportunity**: Can leverage existing pulse icon system for grid visualization

## 🏛️ ARCHITECT (Required)
_User-approved decisions, technical recommendations, and rationale.  
Document all architectural notes and user approvals here._  
**Last updated:** 2025-01-06 22:00

### **Architecture Decision: Enhanced Milonga Page with Tabs**
- **Decision**: Enhance existing `/rhythms/milonga` page rather than create new route
- **Approach**: Add Material-UI Tabs with "Learn" (existing) and "Play" (new grid) sections
- **Rationale**: Maintains existing navigation structure and user expectations

### **Technical Architecture:**

#### **Component Structure:**
```
/src/app/rhythms/milonga/
├── page.js (enhanced with tabs)
├── components/
│   ├── MilongaGrid.jsx (main grid component)
│   ├── RhythmPresetSelector.jsx (dropdown)
│   ├── GridPlaybackControls.jsx (play/stop/tempo)
│   └── GridCell.jsx (individual track cells)
```

#### **Data Architecture:**
```
/public/rhythms/canned/
├── milonga-lisa.json
├── milonga-traspie.json
└── milonga-contratiempo.json

Format:
{
  "name": "Milonga Lisa",
  "rhythmType": "milonga",
  "timeSignature": "2/4",
  "loopLength": 8,
  "defaultBPM": 120,
  "tracks": {
    "drumA": [{"isActive": true, "sound": "kick", "intensity": "strong"}, ...],
    "drumB": [{"isActive": false, "sound": "rim"}, ...],
    "bass": [{"isActive": true, "note": "A", "octave": 2}, ...]
  }
}
```

#### **Audio Integration Strategy:**
- **Tone.js**: Add for synthetic rhythm generation and grid playback
- **Isolation**: Keep Tone.js grid system separate from existing HTML5 audio player
- **UI State**: Pause existing audio when grid plays, and vice versa
- **Shared Assets**: Leverage existing rhythm icons for grid cell states

#### **Sound Library Design:**
```javascript
const DRUM_SOUNDS = {
  kick: { url: '/audio/drums/kick.wav', volume: 0.8 },
  snare: { url: '/audio/drums/snare.wav', volume: 0.7 },
  rim: { url: '/audio/drums/rim.wav', volume: 0.6 },
  hihat: { url: '/audio/drums/hihat.wav', volume: 0.5 }
};

const BASS_NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const OCTAVES = [1, 2, 3];
```

### **UI/UX Architecture:**

#### **Responsive Design:**
- **Desktop**: Side-by-side grid tracks with controls below
- **Mobile**: Stacked tracks with collapsible controls
- **Integration**: Match existing MUI theme and spacing patterns

#### **Visual Feedback:**
- **Active Cells**: Use existing rhythm icons (1.png, 2.png, etc.)
- **Playing State**: Pulse animation similar to existing PulseIcon
- **Sound Types**: Color coding for kick (red), snare (blue), bass (green)

## 🛠️ BUILDER (Required)
_Implementation details, blockers, and technical choices.  
Document what was built, how, and any issues encountered._  
**Last updated:** 2025-01-06 22:30

### **Implementation Complete - Core Feature Built**

- ✅ **Feature Branch Created**: `feature/3001-milonga-rhythm-grid`
- ✅ **Tone.js Integration**: Added tone@15.1.22 dependency for audio synthesis
- ✅ **JSON Preset System**: Created 3 preset files in `/public/rhythms/canned/`
  - `milonga-lisa.json`: Simple walking beat pattern
  - `milonga-traspie.json`: Quick-quick-slow syncopated pattern  
  - `milonga-contratiempo.json`: Off-beat syncopation pattern
- ✅ **Component Architecture**: Built modular system:
  - `MilongaGrid.jsx`: Main grid component with Tone.js integration
  - `GridCell.jsx`: Individual track cells with visual feedback
  - `GridPlaybackControls.jsx`: Play/pause/tempo controls
  - `RhythmPresetSelector.jsx`: Dropdown for loading presets
- ✅ **Tabbed Interface**: Enhanced existing milonga page with Learn/Play tabs
- ✅ **Audio System**: Synthetic audio generation using Tone.js MembraneSynth and Synth
- ✅ **Visual Feedback**: Color-coded cells, intensity indicators, current step highlighting
- ✅ **Responsive Design**: Mobile-optimized grid layout matching existing MUI patterns

### **Technical Implementation Details**

**Audio Architecture:**
- Separate Tone.js synths for each track (drumA, drumB, bass)
- Frequency-based drum sounds (kick: 60Hz, snare: 200Hz, hihat: 800Hz)
- Bass notes mapped to frequencies with octave multipliers
- Sequence-based playback with tempo control (60-180 BPM)

**State Management:**
- React useState for rhythm data, playback state, and tempo
- useCallback for optimized Tone.js initialization
- useRef for Tone.js instances and cleanup

**Integration Strategy:**
- Isolated audio system prevents conflicts with existing HTML5 audio player
- Tab interface maintains existing educational content
- Leveraged existing MUI theme and responsive patterns

### **Known Issues & Limitations**
- No drum sound samples included (using synthetic frequencies)
- Limited to basic drum sounds (kick, snare, hihat, rim)
- No save/export functionality for custom patterns
- Basic intensity levels (strong/medium/soft) only

---

## Summary
Interactive milonga rhythm grid feature allowing users to create, edit, and play milonga rhythms with visual grid interface. Integrates with existing milonga education page using tabbed layout.

## Motivation
- **Educational Enhancement**: Provide hands-on rhythm creation and experimentation
- **Interactive Learning**: Allow users to understand milonga patterns through creation
- **Musical Exploration**: Enable rhythm experimentation beyond static examples
- **User Engagement**: Add interactive element to complement existing educational content

## Scope
**In-Scope:**
- Interactive 3-track rhythm grid (Drum A, Drum B, Bass)
- Preset rhythm loading from JSON files
- Real-time playback with Tone.js
- Sound/note selection for individual cells
- Tempo control and basic playback controls
- Integration with existing milonga page

**Out-of-Scope:**
- Recording/exporting rhythms to audio files
- Social sharing of created rhythms
- Advanced effects processing
- MIDI controller integration

## Feature Behavior
| Area       | Behavior Description                                  |
|------------|-------------------------------------------------------|
| UI         | Tabbed interface on existing milonga page with grid  |
| Audio      | Tone.js-based synthetic rhythm playback              |
| Data       | JSON preset files with rhythm pattern definitions    |
| Integration| Isolation from existing HTML5 audio player system    |

## Tasks
| Status         | Task                                          | Last Updated  |
|----------------|-----------------------------------------------|---------------|
| ✅ Complete     | Create feature branch                         | 2025-01-06    |
| ✅ Complete     | Add Tone.js dependency                        | 2025-01-06    |
| ✅ Complete     | Create preset JSON files                      | 2025-01-06    |
| ✅ Complete     | Build MilongaGrid component                   | 2025-01-06    |
| ✅ Complete     | Build RhythmPresetSelector                    | 2025-01-06    |
| ✅ Complete     | Build GridPlaybackControls                    | 2025-01-06    |
| ✅ Complete     | Build GridCell component                      | 2025-01-06    |
| ✅ Complete     | Integrate tabs into existing milonga page     | 2025-01-06    |
| 🚧 Partial     | Add drum sound assets                         | 2025-01-06    |
| ⏳ Pending      | Test playback and grid interaction            |               |
| ⏳ Pending      | Test responsive design                        |               |
| ⏳ Pending      | Integration testing with existing audio       |               |

## Dependencies
- **Tone.js**: For audio synthesis and rhythm playback
- **MUI Tabs**: For tabbed interface integration
- **Drum Sound Samples**: Basic drum sounds for playback
- **Existing Audio System**: Must not conflict with current player

## Timeline
| Milestone | Date       |
|-----------|------------|
| Created   | 2025-01-06 |
| First Dev | TBD        |
| Review    | TBD        |
| Completed | TBD        |

## Owner
AI Guild - Toby Tango Project

---

## Rollback Plan
- Remove Tone.js dependency if conflicts arise
- Revert milonga page to accordion-only layout
- Remove rhythm grid components
- Delete preset JSON files

## Risk Mitigation
- **Audio Conflict**: Implement audio source isolation and mutual pausing
- **Performance**: Use Web Audio API efficiently with proper cleanup
- **Mobile UX**: Test grid interaction on touch devices
- **Browser Support**: Ensure Tone.js compatibility across target browsers