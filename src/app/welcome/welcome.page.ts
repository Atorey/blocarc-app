import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(
    public modalCtrl: ModalController,
    private toast: ToastController
  ) {}

  ngOnInit() {}

  /* async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: ModalLoginComponent,
    });
    await modal.present();
    const result = await modal.onDidDismiss();
  } */

  /* async openRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: ModalRegisterComponent,
    });
    await modal.present();
    const result = await modal.onDidDismiss();
  } */
}
