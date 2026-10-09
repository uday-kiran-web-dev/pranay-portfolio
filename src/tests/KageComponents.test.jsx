import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { KageBackground } from '../components/kage/KageBackground';
import { KageProgressRail } from '../components/kage/KageProgressRail';

describe('Atmospheric Navigation & Background Components', () => {
  it('renders KageBackground canvas element', () => {
    const { container } = render(<KageBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders KageProgressRail with updated chapter indicators', () => {
    render(<KageProgressRail />);
    const rail = screen.getByLabelText(/Chapter Navigation Rail/i);
    expect(rail).toBeInTheDocument();
    expect(screen.getByTitle('01 · THE GATE')).toBeInTheDocument();
    expect(screen.getByTitle('02 · SELECTED WORK')).toBeInTheDocument();
    expect(screen.getByTitle('03 · ABOUT')).toBeInTheDocument();
    expect(screen.getByTitle('04 · EXPERIENCE')).toBeInTheDocument();
    expect(screen.getByTitle('05 · SERVICES')).toBeInTheDocument();
    expect(screen.getByTitle('06 · CONTACT')).toBeInTheDocument();
  });
});
