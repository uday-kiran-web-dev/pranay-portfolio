import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Services } from '../components/Services';

describe('Services Component', () => {
  it('renders services section title', () => {
    render(<Services />);
    expect(screen.getByText(/Specialized Services/i)).toBeInTheDocument();
    expect(screen.getByText(/WHAT I DO/i)).toBeInTheDocument();
  });

  it('renders core service offerings without color grading', () => {
    render(<Services />);
    expect(screen.getByText('VIDEO EDITING')).toBeInTheDocument();
    expect(screen.getByText('MOTION GRAPHICS & VFX')).toBeInTheDocument();
    expect(screen.getByText('SOCIAL MEDIA CONTENT')).toBeInTheDocument();
    expect(screen.getByText('SOUND DESIGN')).toBeInTheDocument();
    expect(screen.getByText('GRAPHIC DESIGN & ASSETS')).toBeInTheDocument();
  });
});
