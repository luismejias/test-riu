import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NotFoundComponent } from '../../../../shared';
import { DeleteHeroeComponent, EditHeroeComponent, HeroesTableComponent, SaveHeroeComponent } from '../';
import { MatTableDataSource } from '@angular/material/table';
import { Heroe } from '../../models/heroe.model';
import { HeroeService } from '../../services/heroe.service';



@Component({
  selector: 'app-heroes-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgIf,
    HeroesTableComponent,
    NotFoundComponent,
  ],
  templateUrl: './heroes-page.component.html',
  styleUrl: './heroes-page.component.scss',
})
export class HeroesPageComponent {
  dataSource = new MatTableDataSource<Heroe>([]);
  originalDataSource = new MatTableDataSource<Heroe>([]);
  loadingData: boolean = true;
  searchForm!: UntypedFormGroup;
  subscription = new Subscription();
  private _snackBar = inject(MatSnackBar);
  private _dialog = inject(MatDialog);
  private heroeService = inject(HeroeService);
  private fb = inject(UntypedFormBuilder);
  constructor() {
    this.searchForm = this.fb?.group({
      searchField: ['']
    });
  }

  ngOnInit(): void {
    this.searchFieldChanges();
    this.getHeroes();
  }

  searchFieldChanges() {
    this.searchForm?.get('searchField')?.valueChanges.subscribe((value) => {
      this.filterHeroes(value);
    });
  }

  getHeroes() {
    this.loadingData = true;
    this.subscription.add(
      this.heroeService.getHeroes()
        .subscribe((res: Heroe[]) => {
          if (res)
            this.dataSource.data = res;
          this.originalDataSource.data = res;
          this.loadingData = false;
        })
    );
  }

  addHeroe(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = '';
    const dialogRef = this._dialog.open(
      SaveHeroeComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((heroeData) => {
      if (heroeData) {
        this.heroeService.addHeroe(heroeData);
        this.getHeroes();
      }
    });
  }

  editHeroe(heroeData: Heroe): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = heroeData ? heroeData : '';
    const dialogRef = this._dialog.open(
      EditHeroeComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((heroeData) => {
      if (heroeData) {
        this.heroeService.editHeroe(heroeData).subscribe((res) => {
          if (res) {
            this._snackBar.open('Datos del heroe actualizados!!!', 'cerrar');
            this.getHeroes();
          } else {
            this._snackBar.open('Ocurrio un error al realizar la operación!!!', 'cerrar');
          }
        });
      }
    });
  }

  deleteHeroe(heroeId: string) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		const dialogRef = this._dialog.open(
			DeleteHeroeComponent,
			dialogConfig
		);

		dialogRef.afterClosed().subscribe((dataOnDelete) => {
			if (dataOnDelete.ok)
				this.heroeService.deleteHeroe(heroeId).subscribe((res) => {
          if (res){
            this._snackBar.open('Datos del heroe eliminados!!!', 'cerrar');
            this.getHeroes();
          } else
            this._snackBar.open('Ocurrio un error al realizar la operación!!!', 'cerrar');
				});
		});
	}

  get dataSourceLength(): boolean {
    return this.dataSource.data.length > 0;
  }

  filterHeroes(searching: string = ''): void {
    this.dataSource.data = this.originalDataSource.data.filter((heroe) => {
      return (
        heroe.name
          .toLowerCase()
          .includes(searching.toLowerCase() || '')
        || heroe.id.toString().includes(searching.toLowerCase() || '')
      );
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
}
