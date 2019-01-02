/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SiltestComponent } from './siltest.component';

describe('SiltestComponent', () => {
  let component: SiltestComponent;
  let fixture: ComponentFixture<SiltestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiltestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiltestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
