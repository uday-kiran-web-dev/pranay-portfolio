export const SOUND_STEMS = [
  {
    id: 'dialogue',
    name: 'Dialogue & ADR',
    type: 'Voice Track (A1)',
    color: '#06B6D4', // Cyan
    description: 'Clean lavalier and boom isolation with surgical iZotope RX de-noise and EQ presence.',
    defaultMuted: false,
    defaultVolume: 85,
    pan: 'Center (0)',
    dspChain: 'iZotope De-Click -> FabFilter Pro-Q3 -> LA-2A Optical Compression',
    frequencies: [20, 45, 80, 95, 70, 50, 30, 15],
  },
  {
    id: 'foley',
    name: 'Foley & Tactical SFX',
    type: 'Effects Track (A2-A4)',
    color: '#F59E0B', // Amber
    description: 'Footsteps, cloth rustle, weapon clicks, tire screech, and kinetic sub-bass transient impacts.',
    defaultMuted: false,
    defaultVolume: 78,
    pan: 'L 25% / R 25%',
    dspChain: 'Transient Shaper -> Soundtoys Decapitator -> Oxford Limiter',
    frequencies: [65, 85, 90, 75, 60, 85, 92, 40],
  },
  {
    id: 'ambience',
    name: 'Atmosphere & Room Tone',
    type: 'Ambience Track (A5-A6)',
    color: '#8B5CF6', // Purple
    description: 'Subtle binaural room reverbs, rain downpours, wind howling, and HVAC low-frequency drone.',
    defaultMuted: false,
    defaultVolume: 65,
    pan: 'Wide Stereo (90%)',
    dspChain: 'Valhalla VintageVerb -> FabFilter Pro-MB Multiband Expander',
    frequencies: [35, 40, 50, 45, 55, 60, 48, 30],
  },
  {
    id: 'score',
    name: 'Hybrid Cinematic Score',
    type: 'Music Master (A7-A8)',
    color: '#F43F5E', // Crimson
    description: 'Analog synth bass pulses, driving Hans Zimmer-style orchestral strings, and 808 side-chain drops.',
    defaultMuted: false,
    defaultVolume: 90,
    pan: 'Stereo Master',
    dspChain: 'Gullfoss Dynamic EQ -> Shadow Hills Mastering Compressor',
    frequencies: [80, 95, 78, 88, 92, 85, 75, 60],
  },
];

