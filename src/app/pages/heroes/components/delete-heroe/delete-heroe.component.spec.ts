import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteHeroeComponent } from './delete-heroe.component';

describe('DeleteHeroeComponent', () => {
  let mockDialogRef: jest.Mocked<MatDialogRef<DeleteHeroeComponent>>;

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<DeleteHeroeComponent>>;

    await render(DeleteHeroeComponent, {
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }],
    });
  });

  it('should render the component', () => { 
    expect(screen.getByText('¿Esta seguro que desea eliminar el heroe?')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Borrar/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeTruthy();
  });

  it('should close the dialog with { ok: true } when delete is clicked', async () => {
    const deleteButton = screen.getByRole('button', { name: /Borrar/i });
    await userEvent.click(deleteButton);

    expect(mockDialogRef.close).toHaveBeenCalledWith({ ok: true });
  });

  it('should close the dialog with { ok: false } when close is clicked', async () => {
    const closeButton = screen.getByRole('button', { name: /Cancelar/i });
    await userEvent.click(closeButton);

    expect(mockDialogRef.close).toHaveBeenCalledWith({ ok: false });
  });
});
