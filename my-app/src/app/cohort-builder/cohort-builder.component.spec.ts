import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortBuilderComponent } from './cohort-builder.component';

describe('CohortBuilderComponent', () => {
  let component: CohortBuilderComponent;
  let fixture: ComponentFixture<CohortBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CohortBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
