import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationAssuranceComponent } from './innovation-assurance.component';

describe('InnovationAssuranceComponent', () => {
  let component: InnovationAssuranceComponent;
  let fixture: ComponentFixture<InnovationAssuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationAssuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
