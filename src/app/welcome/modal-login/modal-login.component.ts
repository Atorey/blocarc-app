import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent implements OnInit {
  constructor(private nav: NavController, public modalCtrl: ModalController) {}

  ngOnInit() {}

  login(){
    this.nav.navigateForward(['/auth/login']);
    this.modalCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
