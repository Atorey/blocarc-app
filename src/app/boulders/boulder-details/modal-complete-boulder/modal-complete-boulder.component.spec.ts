import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCompleteBoulderComponent } from './modal-complete-boulder.component';

describe('ModalCompleteBoulderComponent', () => {
  let component: ModalCompleteBoulderComponent;
  let fixture: ComponentFixture<ModalCompleteBoulderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCompleteBoulderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCompleteBoulderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
