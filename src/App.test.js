import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home component', () => {
  render(<App />);
  
  const welcomeText = screen.getByText(/Seja bem-vindo! Este sistema permite o registro e acompanhamento do nível de dor de pacientes./i);
  expect(welcomeText).toBeInTheDocument();
});