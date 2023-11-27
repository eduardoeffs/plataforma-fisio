import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import AddPatient from './AddPatient';

jest.mock('axios');

describe('AddPatient', () => {
  const API_URL = 'https://plataforma-app.azurewebsites.net/';
  beforeEach(() => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <AddPatient />
      </MemoryRouter>
    );
  });

  test('fills out form fields and submits new patient', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Paciente criado com sucesso' } });

    const firstNameInput = screen.getByPlaceholderText('Primeiro Nome');
    const lastNameInput = screen.getByPlaceholderText('Sobrenome');
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const addButton = screen.getByRole('button', { name: /Adicionar Paciente/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(axios.post).toHaveBeenCalledWith(`${API_URL}/api/create-patient`, {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123'
    });
  });

  test('validates email correctly', async () => {
    const emailInput = screen.getByPlaceholderText('E-mail');
    const addButton = screen.getByRole('button', { name: /Adicionar Paciente/i });

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(window.alert).toHaveBeenCalledWith('Todos os campos são obrigatórios.');
  });

  test('validates required fields', async () => {
    const addButton = screen.getByRole('button', { name: /Adicionar Paciente/i });

    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(window.alert).toHaveBeenCalledWith('Todos os campos são obrigatórios.');
  });
});