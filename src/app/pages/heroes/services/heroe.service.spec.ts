import { TestBed } from '@angular/core/testing';
import { HeroeService } from './heroe.service';
import { Heroe } from '../models/heroe.model';
import heroesMock from '../../../../assets/data/heroes.json';

describe('HeroeService', () => {
  let service: HeroeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroeService],
    });

    service = TestBed.inject(HeroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the initial list of heroes', (done) => {
    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(heroesMock);
      done();
    });
  });

  it('should add a hero to the list', (done) => {
    const newHero: Heroe = { id: '100', name: 'New Hero', biography: '', appearance: '', image: '', house: '' };

    service.addHeroe(newHero).subscribe((heroes) => {
      expect(heroes.length).toBe(heroesMock.length + 1);
      expect(heroes.find((h) => h.id === newHero.id)).toEqual(newHero);
      done();
    });
  });

  it('should edit a hero correctly', (done) => {
    const updatedHero: Heroe = { ...heroesMock[0], name: 'Updated Name' };

    service.editHeroe(updatedHero).subscribe((heroes) => {
      expect(heroes.find((h) => h.id === updatedHero.id)?.name).toBe('Updated Name');
      done();
    });
  });

  it('should delete a hero from the list', (done) => {
    const heroIdToDelete = heroesMock[0].id.toString();

    service.deleteHeroe(heroIdToDelete).subscribe((heroes) => {
      expect(heroes.find((h) => h.id.toString() === heroIdToDelete)).toBeUndefined();
      done();
    });
  });

  it('should return a hero by id', (done) => {
    const heroId = heroesMock[0].id.toString();

    service.getHeroeById(heroId).subscribe((hero) => {
      expect(hero).toBeDefined();
      expect(hero?.id.toString()).toBe(heroId);
      done();
    });
  });

  it('should return undefined for a non-existing hero', (done) => {
    service.getHeroeById('999').subscribe((hero) => {
      expect(hero).toBeUndefined();
      done();
    });
  });
});
