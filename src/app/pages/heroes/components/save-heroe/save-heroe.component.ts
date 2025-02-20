import { Component, Inject, OnInit } from '@angular/core';
import { MatOption } from '@angular/material/core';

import { HOUSES } from '../../constants/constants';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Heroe, ImageError, makeHeroe } from '../../models/heroe.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeToUppercaseDirective, ImageService } from '../../../../shared';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-save-heroe',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgClass,
    NgFor,
    NgIf,
    MatError,
    MatFormField,
    MatInputModule, 
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatLabel,
    MatSelect,
    MatOption,
    ChangeToUppercaseDirective
  ],
  templateUrl: './save-heroe.component.html',
  styleUrl: './save-heroe.component.scss',
})
export class SaveHeroeComponent implements OnInit {
  idHeroe: string = '';
  saveHeroeForm!: UntypedFormGroup;
  imageFinal: any;
  imageName!: string;
  filePath!: string;
  fileData!: File;
  previewUrl: any = null;
  buttonDisabled = true;
  isImage: boolean = false;
  imageErrors: ImageError[] = [];
  public class = 'fa fa-upload';
  public houses = HOUSES;

  constructor(
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<SaveHeroeComponent>,
    private imageService: ImageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const { name, biography, appearance, house, image } = this.data;    
    this.saveHeroeForm = this.fb.group({
      name: [
        name,
        Validators.compose([
          Validators.maxLength(50),
          Validators.minLength(2),
          Validators.required,
        ]),
      ],
      biography: [
        biography,
        Validators.compose([Validators.minLength(2), Validators.required]),
      ],
      appearance: [appearance ? new Date(appearance): '', Validators.required],
      image: [''],
      house: [house, Validators.compose([Validators.required])],
    });
  }
  ngOnInit() {
    this.idHeroe = this.data.id;
    this.setDefaultImage();
  }

  get biography() {
    return this.saveHeroeForm.get('biography');
  }

  get name() {
    return this.saveHeroeForm.get('name');
  }

  get appearance() {
    return this.saveHeroeForm.get('appearance');
  }

  get image() {
    return this.saveHeroeForm.get('image');
  }

  get house() {
    return this.saveHeroeForm.get('name');
  }

  save() {
    const { name, biography, appearance, house } = this.saveHeroeForm.value;
    const heroe: Heroe = makeHeroe({
      id: this.idHeroe,
      image: this.previewUrl,
      name,
      biography,
      appearance,
      house,
    });
    this.dialogRef.close({
      ...heroe,
    });
  }

  close() {
    this.dialogRef.close();
  }

  validateImage(obj: any): void {
    this.imageErrors = this.imageService.validateImage(obj);
    if (this.imageErrors.length <= 0) {
      this.imageFinal = obj.target.files[0];
      this.buttonDisabled = false;
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFinal);
      reader.onload = () => {
        this.previewUrl = reader.result;
      };

      const imageAux = this.imageFinal.name.split('.');
      this.imageName = `${imageAux[0]}_${
        new Date().getTime() + '.' + imageAux[1]
      }`;
      this.filePath = `/images/${imageAux[0]}_${
        new Date().getTime() + '.' + imageAux[1]
      }`;

      this.isImage = true;
    } else {
      this.isImage = false;
      this.previewUrl = null;
      this.buttonDisabled = true;
    }
  }

  setDefaultImage() {
    if (Object.values(this.data).length > 0) {
      this.previewUrl = this.data.image;
      if (!this.previewUrl)
        this.saveHeroeForm.addControl(
          'image',
          new UntypedFormControl('', Validators.required)
        );
      else this.buttonDisabled = false;
    }
  }
}

