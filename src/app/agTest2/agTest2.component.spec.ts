/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgTest2Component } from './agTest2.component';

describe('AgTest2Component', () => {
  let component: AgTest2Component;
  let fixture: ComponentFixture<AgTest2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTest2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
