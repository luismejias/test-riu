import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Heroe } from '../models/heroe.model';
import heroesMock from '../../../../assets/data/heroes.json';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HeroeService {

  getHeroes(): Observable<Heroe[]> {
    return of(heroesMock as Heroe[]).pipe(delay(1000));
  }

  addHeroe(heroe: Heroe) {
    heroesMock.push(heroe);
    return of(heroesMock as Heroe[]).pipe(delay(1000));
  }

  editHeroe(heroerNew: Heroe) {
    let heroeResult = heroesMock.filter((heroe: Heroe) => {
      return heroe.id !== heroerNew.id;
    });
    heroesMock.length = 0;
    heroesMock.push(heroerNew, ...heroeResult);
    return of(heroesMock as Heroe[]).pipe(delay(1000));
  }

  deleteHeroe(id: string) {
    let heroeResult = heroesMock.filter((heroe: Heroe) => {
      return heroe.id.toString() !== id;
    });
    heroesMock.length = 0;
    heroesMock.push(...heroeResult);
    return of(heroesMock as Heroe[]).pipe(delay(1000));
  }
}
