import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GlitterWrap } from '../components/originkit/GlitterWrap';
import { StarGate } from '../components/originkit/StarGate';
import { ScanGridButton } from '../components/originkit/ScanGridButton';
import { NeonBorder } from '../components/originkit/NeonBorder';
import { LiquidCarveButton } from '../components/originkit/LiquidCarveButton';

// Mock IntersectionObserver for Vitest
global.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    this.callback([{ isIntersecting: true }]);
  }
  unobserve() {}
  disconnect() {}
};

describe('OriginKit Components Suite', () => {
  it('renders GlitterWrap with canvas and wrapped content', () => {
    const { container } = render(
      <GlitterWrap>
        <div>Glitter Content</div>
      </GlitterWrap>
    );
    expect(screen.getByText('Glitter Content')).toBeInTheDocument();
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('renders StarGate concentric rings and children', () => {
    const { container } = render(
      <StarGate>
        <div>StarGate Center</div>
      </StarGate>
    );
    expect(screen.getByText('StarGate Center')).toBeInTheDocument();
    expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(3);
  });

  it('renders ScanGridButton and handles click events', () => {
    const handleClick = vi.fn();
    render(
      <ScanGridButton variant="amber" onClick={handleClick}>
        Scan Trigger
      </ScanGridButton>
    );
    const btn = screen.getByRole('button', { name: /Scan Trigger/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders NeonBorder wrapping content with animated beam', () => {
    render(
      <NeonBorder color="#f59e0b">
        <div>Neon Content</div>
      </NeonBorder>
    );
    expect(screen.getByText('Neon Content')).toBeInTheDocument();
  });

  it('renders LiquidCarveButton and handles interactions', () => {
    const handleClick = vi.fn();
    render(
      <LiquidCarveButton variant="amber" onClick={handleClick}>
        Liquid Press
      </LiquidCarveButton>
    );
    const btn = screen.getByRole('button', { name: /Liquid Press/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
