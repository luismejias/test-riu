import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-heroe',
  standalone: true,
  imports: [],
  templateUrl: './delete-heroe.component.html',
  styleUrl: './delete-heroe.component.scss'
})
export class DeleteHeroeComponent {
  private dialogRef = inject(MatDialogRef<DeleteHeroeComponent>)

  delete() { 
		this.dialogRef.close({ ok: true });
	}

  close() {
		this.dialogRef.close({ ok: false });
	}

}
