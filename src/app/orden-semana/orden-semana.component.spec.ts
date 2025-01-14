import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenSemanaComponent } from './orden-semana.component';

describe('OrdenSemanaComponent', () => {
  let component: OrdenSemanaComponent;
  let fixture: ComponentFixture<OrdenSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenSemanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
