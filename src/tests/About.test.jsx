import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { About } from '../components/About';

describe('About & Experience Component', () => {
  it('renders about section with headline and biography', () => {
    render(<About onOpenContact={() => {}} />);
    expect(screen.getByText(/A Visual Storyteller at Heart/i)).toBeInTheDocument();
    expect(screen.getByText(/TURNING RAW RUSHES INTO MEMORABLE MOMENTS/i)).toBeInTheDocument();
    expect(screen.getByText(/FILMS • BRANDS • PEOPLE • IDEAS • CULTURE/i)).toBeInTheDocument();
  });

  it('renders verified experience roles', () => {
    render(<About onOpenContact={() => {}} />);
    expect(screen.getByText(/FILMYFOCUS | LOPPLY | Tamada Media Pvt. Ltd./i)).toBeInTheDocument();
    expect(screen.getByText(/Independent Client Collaborations/i)).toBeInTheDocument();
    expect(screen.getByText(/1 YEAR 2 MONTHS/i)).toBeInTheDocument();
    expect(screen.getByText(/8 MONTHS/i)).toBeInTheDocument();
  });

  it('renders resume and contact buttons', () => {
    render(<About onOpenContact={() => {}} />);
    expect(screen.getByText(/Download Résumé/i)).toBeInTheDocument();
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
  });
});
