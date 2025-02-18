import { Injectable } from '@angular/core';
interface ImageError {
  key: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageErrors: ImageError[] = [];
  validateImage(obj: { target: { files: any[]; }; }): ImageError[] {
    this.imageErrors = [];
    let uploadFile = obj.target.files[0];
    // convertir tamaño en MB
    const size = uploadFile.size / 1024 / 1024;
    if (!uploadFile.type.match(/image\/*/)) {
      this.imageErrors.push({ key: 'notImage', message: 'El archivo a adjuntar no es una imagen' });
    } else if (size > 5) {
      this.imageErrors = [];
      this.imageErrors.push({ key: 'exceededSize', message: 'El peso de la imagen no puede exceder los 5Mb' });
      uploadFile = null;
    }
    return this.imageErrors;
  }
}
