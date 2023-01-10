import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCohortComponent } from './generate-cohort.component';

describe('GenerateCohortComponent', () => {
  let component: GenerateCohortComponent;
  let fixture: ComponentFixture<GenerateCohortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCohortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCohortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
