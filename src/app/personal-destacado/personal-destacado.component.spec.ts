import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDestacadoComponent } from './personal-destacado.component';

describe('PersonalDestacadoComponent', () => {
  let component: PersonalDestacadoComponent;
  let fixture: ComponentFixture<PersonalDestacadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDestacadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDestacadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
