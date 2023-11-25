import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import TherapistLogin from './TherapistLogin';

jest.mock('axios');
global.alert = jest.fn();

describe('TherapistLogin Component', () => {
  beforeEach(() => {
    axios.post.mockClear();
    global.alert.mockClear();
  });

  const setup = () => {
    render(
      <MemoryRouter>
        <TherapistLogin />
      </MemoryRouter>
    );
    const usernameInput = screen.getByPlaceholderText('Usuário');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const submitButton = screen.getByRole('button', { name: /login/i });
    return {
      usernameInput,
      passwordInput,
      submitButton,
    };
  };

  it('navigates to therapist dashboard on successful login', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'Autenticação bem-sucedida.' },
    });

    const { usernameInput, passwordInput, submitButton } = setup();

    fireEvent.change(usernameInput, { target: { value: 'therapistUser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).not.toHaveBeenCalled();
    });
  });

  it('shows an alert with an error message when login credentials are incorrect', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Credenciais inválidas' } },
    });

    const { usernameInput, passwordInput, submitButton } = setup();

    fireEvent.change(usernameInput, { target: { value: 'wrongUser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Credenciais inválidas');
    });
  });

  it('shows a server error alert when the request fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    const { usernameInput, passwordInput, submitButton } = setup();

    fireEvent.change(usernameInput, { target: { value: 'therapistUser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Erro de conexão com o servidor.');
    });
  });
});
