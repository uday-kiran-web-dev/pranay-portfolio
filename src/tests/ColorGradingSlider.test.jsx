import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ColorGradingSlider } from '../components/ColorGradingSlider';

describe('ColorGradingSlider Component', () => {
  it('renders title and preset options', () => {
    render(<ColorGradingSlider />);
    expect(screen.getByText(/Color Grading & Film Emulation/i)).toBeInTheDocument();
    expect(screen.getByText('Kodak 2383 Print Film')).toBeInTheDocument();
    expect(screen.getByText('Neo-Tokyo Teal & Amber')).toBeInTheDocument();
  });

  it('switches active preset when clicking a preset card', () => {
    render(<ColorGradingSlider />);
    const neoTokyoBtn = screen.getByText('Neo-Tokyo Teal & Amber');
    fireEvent.click(neoTokyoBtn);

    expect(screen.getByText(/DaVinci Wide Gamut Intermediate/i)).toBeInTheDocument();
    expect(screen.getByText('-12 Green')).toBeInTheDocument();
  });

  it('toggles bypass mode', () => {
    render(<ColorGradingSlider />);
    const bypassBtn = screen.getByRole('button', { name: /GRADED COLOR PASS/i });
    fireEvent.click(bypassBtn);

    expect(screen.getByText(/BYPASS ACTIVE \(RAW LOG\)/i)).toBeInTheDocument();
  });

  it('allows switching scopes between Waveform, RGB Parade, and Vectorscope', () => {
    render(<ColorGradingSlider />);
    const rgbBtn = screen.getByRole('button', { name: /RGB Parade/i });
    fireEvent.click(rgbBtn);
    expect(screen.getByRole('button', { name: /RGB Parade/i })).toHaveClass('bg-amber-500');

    const vectorBtn = screen.getByRole('button', { name: /Vectorscope/i });
    fireEvent.click(vectorBtn);
    expect(screen.getByText('Mg')).toBeInTheDocument();
  });
});

