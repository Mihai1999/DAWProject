import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmealComponent } from './editmeal.component';

describe('EditmealComponent', () => {
  let component: EditmealComponent;
  let fixture: ComponentFixture<EditmealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
