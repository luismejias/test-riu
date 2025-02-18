import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveHeroeComponent } from './save-heroe.component';

describe('SaveHeroeComponent', () => {
  let component: SaveHeroeComponent;
  let fixture: ComponentFixture<SaveHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveHeroeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
