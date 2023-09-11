import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditprofileComponent } from './DialogEditprofileComponent';

describe('DialogEditprofileComponent', () => {
  let component: DialogEditprofileComponent;
  let fixture: ComponentFixture<DialogEditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
