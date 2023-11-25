import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import PatientList from './PatientList';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

const mockPatients = [
  { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
  { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
];

describe('PatientList', () => {
  beforeEach(async () => {
    axios.get.mockResolvedValueOnce({ data: { patients: mockPatients } });
    await act(async () => {
      render(
        <MemoryRouter>
          <PatientList />
        </MemoryRouter>
      );
    });
  });

  test('renders the list of patients', async () => {
    await waitFor(() => {
      mockPatients.forEach(patient => {
        const fullName = `${patient.firstName} ${patient.lastName}`;
        expect(screen.getByText(fullName)).toBeInTheDocument();
      });
    });
  });

  test('clicking delete button opens confirmation modal', async () => {
    const deleteButtons = await screen.findAllByLabelText('delete patient');
    act(() => {
      fireEvent.click(deleteButtons[0]);
    });
  
    const modalText = screen.getByText(/Tem certeza de que deseja excluir este paciente?/i);
    expect(modalText).toBeInTheDocument();
  });
  
  test('clicking cancel button in modal closes it', async () => {
    const deleteButtons = await screen.findAllByLabelText('delete patient');
    act(() => {
      fireEvent.click(deleteButtons[0]);
    });
    
    act(() => {
      const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
      fireEvent.click(cancelButton);
    });
  
    await waitFor(() => {
      expect(screen.queryByText(/Tem certeza de que deseja excluir este paciente?/i)).not.toBeInTheDocument();
    });
  });
  
  test('confirming deletion removes patient from list', async () => {
    const refreshedMockPatients = mockPatients.filter(p => p._id !== mockPatients[0]._id);
    axios.delete.mockResolvedValueOnce({});
    axios.get.mockResolvedValueOnce({ data: { patients: refreshedMockPatients } });
   
    const deleteButtons = await screen.findAllByLabelText('delete patient');
    act(() => {
      fireEvent.click(deleteButtons[0]);
    });
  
    await act(async () => {
      const confirmButton = screen.getByRole('button', { name: /Excluir/i });
      fireEvent.click(confirmButton);
    });
    
    await waitFor(() => {
      expect(screen.queryByText(`${mockPatients[0].firstName} ${mockPatients[0].lastName}`)).not.toBeInTheDocument();
    });
  });
});