import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalUpdateBoulderComponent } from './modal-update-boulder.component';

describe('ModalUpdateBoulderComponent', () => {
  let component: ModalUpdateBoulderComponent;
  let fixture: ComponentFixture<ModalUpdateBoulderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUpdateBoulderComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUpdateBoulderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
