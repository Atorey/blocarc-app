import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss'],
})
export class ModalRegisterComponent implements OnInit {
  constructor(private nav: NavController, public modalCtrl: ModalController) {}

  ngOnInit() {}

  register() {
    this.nav.navigateForward(['/auth/register']);
    this.modalCtrl.dismiss();
  }

  login() {
    this.nav.navigateForward(['/auth/login']);
    this.modalCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
