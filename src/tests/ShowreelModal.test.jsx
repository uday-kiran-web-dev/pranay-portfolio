import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ShowreelModal } from '../components/ShowreelModal';

describe('ShowreelModal Component', () => {
  it('does not render when isOpen is false', () => {
    render(<ShowreelModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal with video controls when isOpen is true', () => {
    render(<ShowreelModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/PRANAY \/\/ 2025 SHOWREEL MASTER/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Close Showreel modal/i })).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    const handleClose = vi.fn();
    render(<ShowreelModal isOpen={true} onClose={handleClose} />);
    const closeBtn = screen.getByRole('button', { name: /Close Showreel modal/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('allows switching chapters', () => {
    render(<ShowreelModal isOpen={true} onClose={() => {}} />);
    const cyberpunkChapterBtn = screen.getByRole('button', { name: /Cyberpunk VFX/i });
    fireEvent.click(cyberpunkChapterBtn);
    expect(cyberpunkChapterBtn).toBeInTheDocument();
  });
});
