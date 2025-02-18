import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHeroeComponent } from './delete-heroe.component';

describe('DeleteHeroeComponent', () => {
  let component: DeleteHeroeComponent;
  let fixture: ComponentFixture<DeleteHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHeroeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
