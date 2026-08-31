import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectGrid } from '../components/ProjectGrid';

describe('ProjectGrid Component', () => {
  it('renders all projects by default in Bento Grid mode', () => {
    render(<ProjectGrid />);
    expect(screen.getByText('FLIPKART BIG DIWALI SALE')).toBeInTheDocument();
    expect(screen.getByText('HERITAGE GOLD & DIAMONDS')).toBeInTheDocument();
    expect(screen.getByText('AUDIO ODYSSEY STORIES')).toBeInTheDocument();
  });

  it('filters by category when clicking a category pill', () => {
    render(<ProjectGrid />);
    const entertainmentBtn = screen.getByRole('button', { name: 'Entertainment' });
    fireEvent.click(entertainmentBtn);

    expect(screen.getByText('ENTERTAINMENT INSIDER')).toBeInTheDocument();
    expect(screen.queryByText('FLIPKART BIG DIWALI SALE')).not.toBeInTheDocument();
  });

  it('filters by search input', () => {
    render(<ProjectGrid />);
    const searchInput = screen.getByPlaceholderText(/Search client, style, role/i);
    fireEvent.change(searchInput, { target: { value: 'Flipkart' } });

    expect(screen.getByText('FLIPKART BIG DIWALI SALE')).toBeInTheDocument();
    expect(screen.queryByText('HERITAGE GOLD & DIAMONDS')).not.toBeInTheDocument();
  });

  it('opens case study modal when clicking a project card', () => {
    render(<ProjectGrid />);
    const flipkartCard = screen.getByTestId('project-card-flipkart-ecommerce');
    fireEvent.click(flipkartCard);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Editorial Vision & Narrative Strategy/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Flipkart/i).length).toBeGreaterThan(0);
  });
});
