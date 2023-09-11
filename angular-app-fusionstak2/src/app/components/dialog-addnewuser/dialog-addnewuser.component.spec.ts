import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddnewuserComponent } from './dialog-addnewuser.component';

describe('DialogAddnewuserComponent', () => {
  let component: DialogAddnewuserComponent;
  let fixture: ComponentFixture<DialogAddnewuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddnewuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddnewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
