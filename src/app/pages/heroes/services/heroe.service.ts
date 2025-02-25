import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Heroe } from '../models/heroe.model';
import heroesMock from '../../../../assets/data/heroes.json';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private heroesSubject = new BehaviorSubject<Heroe[]>([...heroesMock]);
  public heroes$ = this.heroesSubject.asObservable();

  getHeroes(): Observable<Heroe[]> {
    return this.heroes$.pipe(delay(500));
  }

  addHeroe(heroe: Heroe): Observable<Heroe[]> {    
    const currentHeroes = this.heroesSubject.getValue();
    const updatedHeroes = [...currentHeroes, heroe];
    this.heroesSubject.next(updatedHeroes);
    return of(updatedHeroes).pipe(delay(500));
  }

  editHeroe(heroerNew: Heroe): Observable<Heroe[]> {
    const currentHeroes = this.heroesSubject.getValue();
    const updatedHeroes = currentHeroes.map((heroe) =>
      heroe.id === heroerNew.id ? heroerNew : heroe
    );
    this.heroesSubject.next(updatedHeroes);
    return of(updatedHeroes).pipe(delay(500));
  }

  deleteHeroe(id: string): Observable<Heroe[]> {
    const currentHeroes = this.heroesSubject.getValue();
    const updatedHeroes = currentHeroes.filter((heroe) => heroe.id.toString() !== id);
    this.heroesSubject.next(updatedHeroes);
    return of(updatedHeroes).pipe(delay(500));
  }
  
  getHeroeById(id: string): Observable<Heroe | undefined> {
    return this.heroes$.pipe(
      map((heroes) => heroes.find((heroe) => heroe.id.toString() === id)),
      delay(500)
    );
  }
}
