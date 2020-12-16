import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservingComponent } from './addserving.component';

describe('AddservingComponent', () => {
  let component: AddservingComponent;
  let fixture: ComponentFixture<AddservingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddservingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddservingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
