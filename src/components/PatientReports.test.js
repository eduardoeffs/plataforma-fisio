import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import PatientReports from './PatientReports';
import { MemoryRouter } from 'react-router-dom';




jest.mock('axios');

const mockReports = [
  { _id: '1', dorInicial: 'Leve', escalaEVA: '2', escalaBorg: '1', descri: 'Nenhuma', createdAt: new Date().toISOString() },
];

beforeEach(async () => {
  axios.get.mockResolvedValueOnce({ data: mockReports });
  await act(async () => {
    render(
      <MemoryRouter>
        <PatientReports />
      </MemoryRouter>
    );
  });
});

describe('PatientReports', () => {
  test('renders the patient reports title', () => {
    expect(screen.getByText('Relatórios do Paciente')).toBeInTheDocument();
  });

  test('renders the reports list', async () => {
    await waitFor(() => {
      mockReports.forEach((report) => {
        expect(screen.getByText(new RegExp(report.dorInicial))).toBeInTheDocument();
      });
    });
  });

  test('edit and delete buttons are present for each report', async () => {
    render(<PatientReports />);
  
    const editIcons = await screen.findAllByLabelText('edit report');
    const deleteIcons = await screen.findAllByLabelText('delete report');
  
    expect(editIcons.length).toBe(mockReports.length);
    expect(deleteIcons.length).toBe(mockReports.length);
  });

  test('clicking the edit button opens editable fields with correct report data', async () => {
    const editIcons = await screen.findAllByLabelText('edit report');
 
    await act(async () => {
      fireEvent.click(editIcons[0]);
    });
  
    await waitFor(() => {
      const inputDorInicial = screen.getByLabelText('Dor Inicial');
      const inputEscalaEVA = screen.getByLabelText('Escala EVA');
      const inputEscalaBorg = screen.getByLabelText('Escala Borg');
  
      expect(inputDorInicial).toBeInTheDocument();
      expect(inputEscalaEVA).toBeInTheDocument();
      expect(inputEscalaBorg).toBeInTheDocument();
  
      expect(inputDorInicial.value).toBe(mockReports[0].dorInicial);
      expect(inputEscalaEVA.value).toBe(mockReports[0].escalaEVA.toString());
      expect(inputEscalaBorg.value).toBe(mockReports[0].escalaBorg.toString());
    });
  });

  test('clicking save changes button after editing updates the report data', async () => {
    axios.put.mockResolvedValueOnce({ data: { ...mockReports[0], dorInicial: 'Moderada' } });
    axios.get.mockResolvedValueOnce({ data: [{ ...mockReports[0], dorInicial: 'Moderada' }] });
  
    const editButtons = await screen.findAllByLabelText('edit report');
    fireEvent.click(editButtons[0]);
    
    await waitFor(() => {
      const inputDorInicial = screen.getByLabelText('Dor Inicial');
      fireEvent.change(inputDorInicial, { target: { value: 'Moderada' } });
  
      const saveButton = screen.getByRole('button', { name: /Salvar Alterações/i });
      fireEvent.click(saveButton);
    });
  
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ dorInicial: 'Moderada' }));
      expect(screen.getByText('Moderada')).toBeInTheDocument();
    });
  });

  test('clicking the delete button opens the confirmation modal', async () => {
    const deleteButtons = await screen.findAllByLabelText('delete report');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Tem certeza de que deseja excluir este relatório?')).toBeInTheDocument();
    });
  });

  test('clicking the confirm button in the modal actually deletes the report', async () => {
    axios.delete.mockResolvedValueOnce({});
    const deleteButtons = await screen.findAllByLabelText('delete report');
    fireEvent.click(deleteButtons[0]);

    const confirmButton = screen.getByRole('button', { name: /Excluir/i });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(expect.any(String));
      expect(screen.queryByText(mockReports[0].dorInicial)).not.toBeInTheDocument();
    });
  });

  test('clicking the cancel button closes the confirmation modal', async () => {
    const deleteButtons = await screen.findAllByLabelText('delete report');
    fireEvent.click(deleteButtons[0]);
    
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText('Tem certeza de que deseja excluir este relatório?')).not.toBeInTheDocument();
    });
    
  });
});
