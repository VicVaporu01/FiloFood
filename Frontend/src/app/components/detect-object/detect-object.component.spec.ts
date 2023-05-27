import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectObjectComponent } from './detect-object.component';

describe('DetectObjectComponent', () => {
  let component: DetectObjectComponent;
  let fixture: ComponentFixture<DetectObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetectObjectComponent]
    });
    fixture = TestBed.createComponent(DetectObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
