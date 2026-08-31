export const TIMELINE_TRACKS = [
  {
    id: 'v4',
    name: 'V4 (VFX)',
    type: 'video',
    clips: [
      { id: 'v4-1', title: 'Cyberpunk HUD Overlay', start: 5, duration: 18, color: 'bg-rose-900/80 border-rose-500/60 text-rose-200' },
      { id: 'v4-2', title: '3D Kinetic Price Tag', start: 30, duration: 12, color: 'bg-rose-900/80 border-rose-500/60 text-rose-200' },
      { id: 'v4-3', title: 'Speed Ramp Flares', start: 48, duration: 10, color: 'bg-rose-900/80 border-rose-500/60 text-rose-200' },
    ],
  },
  {
    id: 'v3',
    name: 'V3 (Titles)',
    type: 'video',
    clips: [
      { id: 'v3-1', title: 'Main Title Intro', start: 0, duration: 10, color: 'bg-amber-900/80 border-amber-500/60 text-amber-200' },
      { id: 'v3-2', title: 'Kinetic Subtitles', start: 16, duration: 25, color: 'bg-amber-900/80 border-amber-500/60 text-amber-200' },
      { id: 'v3-3', title: 'Brand Logo Outro', start: 50, duration: 10, color: 'bg-amber-900/80 border-amber-500/60 text-amber-200' },
    ],
  },
  {
    id: 'v2',
    name: 'V2 (B-Roll)',
    type: 'video',
    clips: [
      { id: 'v2-1', title: 'Product Macro 120fps', start: 4, duration: 14, color: 'bg-cyan-900/80 border-cyan-500/60 text-cyan-200' },
      { id: 'v2-2', title: 'Celebrity Reaction Angle', start: 22, duration: 16, color: 'bg-cyan-900/80 border-cyan-500/60 text-cyan-200' },
      { id: 'v2-3', title: 'Cinematic Car Chase Cut', start: 42, duration: 15, color: 'bg-cyan-900/80 border-cyan-500/60 text-cyan-200' },
    ],
  },
  {
    id: 'v1',
    name: 'V1 (A-Roll)',
    type: 'video',
    clips: [
      { id: 'v1-1', title: 'Dialogue Hook Scene', start: 0, duration: 20, color: 'bg-emerald-900/80 border-emerald-500/60 text-emerald-200' },
      { id: 'v1-2', title: 'Master Narrative Cut', start: 20, duration: 22, color: 'bg-emerald-900/80 border-emerald-500/60 text-emerald-200' },
      { id: 'v1-3', title: 'Climax & CTA Scene', start: 42, duration: 18, color: 'bg-emerald-900/80 border-emerald-500/60 text-emerald-200' },
    ],
  },
  {
    id: 'a1',
    name: 'A1 (Dialogue)',
    type: 'audio',
    clips: [
      { id: 'a1-1', title: 'Clean Lav Mic Sync', start: 0, duration: 32, color: 'bg-blue-900/80 border-blue-500/60 text-blue-200' },
      { id: 'a1-2', title: 'Voiceover Punch', start: 35, duration: 23, color: 'bg-blue-900/80 border-blue-500/60 text-blue-200' },
    ],
  },
  {
    id: 'a2',
    name: 'A2 (SFX & Foley)',
    type: 'audio',
    clips: [
      { id: 'a2-1', title: 'Sub Drop & Risers', start: 3, duration: 8, color: 'bg-purple-900/80 border-purple-500/60 text-purple-200' },
      { id: 'a2-2', title: 'Whoosh Transitions', start: 18, duration: 14, color: 'bg-purple-900/80 border-purple-500/60 text-purple-200' },
      { id: 'a2-3', title: 'Impact Hit', start: 42, duration: 10, color: 'bg-purple-900/80 border-purple-500/60 text-purple-200' },
    ],
  },
  {
    id: 'a3',
    name: 'A3 (Music)',
    type: 'audio',
    clips: [
      { id: 'a3-1', title: 'Heavy Synthwave Beat Master', start: 0, duration: 60, color: 'bg-indigo-900/80 border-indigo-500/60 text-indigo-200' },
    ],
  },
];

export const MARKERS = [
  { id: 'm1', time: 5, label: 'Hero Beat Drop' },
  { id: 'm2', time: 22, label: 'Speed Ramp' },
  { id: 'm3', time: 42, label: 'Climax Impact' },
];

