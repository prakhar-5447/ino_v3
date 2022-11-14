import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSocialsComponent } from './view-socials.component';

describe('ViewSocialsComponent', () => {
  let component: ViewSocialsComponent;
  let fixture: ComponentFixture<ViewSocialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSocialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSocialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
