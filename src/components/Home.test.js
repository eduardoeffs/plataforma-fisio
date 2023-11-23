import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  test('renders the main title', () => {
    render(<Home />);
    expect(screen.getByText('Sistema de Acompanhamento de Dor')).toBeInTheDocument();
  });

  test('renders the subtitle', () => {
    render(<Home />);
    expect(screen.getByText('Seja bem-vindo! Este sistema permite o registro e acompanhamento do nível de dor de pacientes.')).toBeInTheDocument();
  });

  test('renders the current year in the footer', () => {
    render(<Home />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Sistema de Acompanhamento de Dor`)).toBeInTheDocument();
  });

  test('has a link to patient login', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: 'Paciente' })).toHaveAttribute('href', 'patient-login');
  });

  test('has a link to therapist login', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: 'Fisioterapeuta' })).toHaveAttribute('href', 'therapist-login');
  });
});