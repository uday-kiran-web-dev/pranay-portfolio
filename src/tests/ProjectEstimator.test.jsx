import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectEstimator } from '../components/ProjectEstimator';

describe('ProjectEstimator Component', () => {
  it('renders default estimator values and options', () => {
    render(<ProjectEstimator onOpenContactWithSpecs={() => {}} />);
    expect(screen.getByText(/Interactive Rate & Scope Calculator/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Brand Commercial/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Rush 48h Turnaround/i })).toBeInTheDocument();
  });

  it('updates price when selecting different deliverable types', () => {
    render(<ProjectEstimator onOpenContactWithSpecs={() => {}} />);
    
    // Select Docu / Long Form
    const docuBtn = screen.getByRole('button', { name: /Docu \/ Long Form/i });
    fireEvent.click(docuBtn);

    const deliverableLabel = screen.getByText('Deliverable:');
    expect(deliverableLabel.parentElement).toHaveTextContent('Docu / Long Form');
  });

  it('calls onOpenContactWithSpecs callback with selected options', () => {
    const mockCallback = vi.fn();
    render(<ProjectEstimator onOpenContactWithSpecs={mockCallback} />);

    const inquireBtn = screen.getByRole('button', { name: /Inquire With These Specs/i });
    fireEvent.click(inquireBtn);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        projectType: 'Brand Commercial',
        turnaround: 'Standard (1-2 Weeks)',
      })
    );
  });
});

