import { Component } from '@angular/core';
import {
  ToastController,
  NavController,
  AlertController,
} from '@ionic/angular';
import { SelfAuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    username: '',
    password: '',
    email: '',
  };
  password2 = '';
  email2 = '';

  constructor(
    private authService: SelfAuthService,
    private toast: ToastController,
    private nav: NavController,
    private alertCtrl: AlertController
  ) {}

  register() {
    this.authService.register(this.user).subscribe(
      async () => {
        this.user = {
          username: '',
          password: '',
          email: '',
        };
        this.password2 = '';
        this.email2 = '';
        (
          await this.toast.create({
            duration: 3000,
            position: 'bottom',
            message: '¡Usuario registrado!',
            color: 'success',
          })
        ).present();
        this.nav.navigateRoot(['/auth/login']);
      },
      async (error) => {
        (
          await this.alertCtrl.create({
            header: 'Error de registro',
            buttons: ['Ok'],
          })
        ).present();
      }
    );
  }
}
