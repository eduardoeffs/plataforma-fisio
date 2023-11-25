import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import PatientLogin from './PatientLogin';

jest.mock('axios');

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PatientLogin Component', () => {
  afterEach(() => {
    window.alert = jest.fn();
    jest.clearAllMocks();
  });

  it('allows a user to log in with correct credentials', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'Autenticação bem-sucedida.', patientId: '123' },
    });

    renderWithRouter(<PatientLogin />);

    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });
    

    await waitFor(() => {
      expect(localStorage.getItem('patientId')).toBe('123');
    });
  });

  it('shows an error message when the login credentials are incorrect', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: 'Email ou senha incorretos.' },
      },
    });

    renderWithRouter(<PatientLogin />);

    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'wrong' } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Email ou senha incorretos.');;
    });
  });

  it('shows a server error when the request fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));
    render(
      <MemoryRouter>
        <PatientLogin />
      </MemoryRouter>
    );
  
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });
  
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Erro de conexão com o servidor.');
    });
  });
});
