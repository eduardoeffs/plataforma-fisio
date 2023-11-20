import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PatientDashboard from './PatientDashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('PatientDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders PatientDashboard component', () => {
    render(
      <Router>
        <PatientDashboard />
      </Router>
    );
    expect(screen.getByText(/Bem-vindo ao seu painel, paciente!/i)).toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Relatório enviado com sucesso.' } });

    render(
      <Router>
        <PatientDashboard />
      </Router>
    );

    
    fireEvent.change(screen.getByTestId('dorInicial-input'), { target: { value: 'Dor moderada' } });
    fireEvent.change(screen.getByTestId('escalaEVA-input'), { target: { value: '5' } });
    fireEvent.change(screen.getByTestId('escalaBorg-input'), { target: { value: '3' } });
    fireEvent.change(screen.getByTestId('descri-input'), { target: { value: 'Observações do paciente' } });

    
    fireEvent.click(screen.getByRole('button', { name: /Enviar Relatório/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      
    });
  });

  test('handles submission errors', async () => {
    axios.post.mockRejectedValueOnce(new Error('Erro ao enviar relatório'));

    render(
      <Router>
        <PatientDashboard />
      </Router>
    );

  
    fireEvent.change(screen.getByTestId('dorInicial-input'), { target: { value: 'Dor intensa' } });
    fireEvent.change(screen.getByTestId('escalaEVA-input'), { target: { value: '8' } });
    fireEvent.change(screen.getByTestId('escalaBorg-input'), { target: { value: '3' } });
    fireEvent.change(screen.getByTestId('descri-input'), { target: { value: 'Observações do paciente' } });

    fireEvent.click(screen.getByRole('button', { name: /Enviar Relatório/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
     
    });
  });
  
  test('clears form after successful submission', async () => {
    window.alert = jest.fn();
    axios.post.mockResolvedValueOnce({ data: { message: 'Relatório enviado com sucesso.' } });
  
    render(
      <Router>
        <PatientDashboard />
      </Router>
    );
  
    fireEvent.change(screen.getByTestId('dorInicial-input'), { target: { value: 'Dor moderada' } });
    fireEvent.change(screen.getByTestId('escalaEVA-input'), { target: { value: '5' } });
    fireEvent.change(screen.getByTestId('escalaBorg-input'), { target: { value: '3' } });
    fireEvent.change(screen.getByTestId('descri-input'), { target: { value: 'Observações do paciente' } });

    
    fireEvent.click(screen.getByRole('button', { name: /Enviar Relatório/i }));
  
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
    
      await waitFor(() => {
        expect(screen.findByTestId('dorInicial-input')).toHaveValue('');
        expect(screen.findByTestId('escalaEVA-input')).toHaveValue('');
        expect(screen.findByTestId('escalaBorg-input')).toHaveValue('');
        expect(screen.findByTestId('descri-input')).toHaveValue('');
      });
      
  });
});
