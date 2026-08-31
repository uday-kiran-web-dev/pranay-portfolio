import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StemsAudioMixer } from '../components/StemsAudioMixer';

describe('StemsAudioMixer Component', () => {
  it('renders all 4 audio stems and volume faders', () => {
    render(<StemsAudioMixer />);
    expect(screen.getByText('Dialogue & ADR')).toBeInTheDocument();
    expect(screen.getByText('Foley & Tactical SFX')).toBeInTheDocument();
    expect(screen.getByText('Environment & Room Tone')).toBeInTheDocument();
    expect(screen.getByText('Cinematic Score & Bass')).toBeInTheDocument();
  });

  it('toggles Solo state for Dialogue stem', () => {
    render(<StemsAudioMixer />);
    const soloDialogueBtn = screen.getByRole('button', { name: /Solo Dialogue & ADR/i });
    fireEvent.click(soloDialogueBtn);

    expect(screen.getByText('SOLO ON')).toBeInTheDocument();
  });

  it('toggles Mute state for Score stem', () => {
    render(<StemsAudioMixer />);
    const muteScoreBtn = screen.getByRole('button', { name: /Mute Cinematic Score & Bass/i });
    fireEvent.click(muteScoreBtn);

    expect(screen.getByText('MUTED')).toBeInTheDocument();
  });

  it('toggles audio bus playing / paused state', () => {
    render(<StemsAudioMixer />);
    const busBtn = screen.getByRole('button', { name: /STOP BUS|PLAY 4-STEM BUS/i });
    expect(busBtn).toBeInTheDocument();
    fireEvent.click(busBtn);
    expect(screen.getByRole('button', { name: /PLAY 4-STEM BUS/i })).toBeInTheDocument();
  });
});
