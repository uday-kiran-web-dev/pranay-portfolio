import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Statistics } from '../components/Statistics';

describe('Statistics Component', () => {
  it('renders verified statistics counts and labels', () => {
    render(<Statistics />);
    expect(screen.getByText('40+')).toBeInTheDocument();
    expect(screen.getByText('BRAND COLLABORATIONS')).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('SHORT FILMS')).toBeInTheDocument();
    expect(screen.getByText('Around 2 Yrs')).toBeInTheDocument();
    expect(screen.getByText('POST EXPERIENCE')).toBeInTheDocument();
    expect(screen.getByText('∞')).toBeInTheDocument();
  });

  it('renders handwritten phrase', () => {
    render(<Statistics />);
    expect(screen.getByText(/More Stories/i)).toBeInTheDocument();
    expect(screen.getByText(/to Create.../i)).toBeInTheDocument();
  });
});
