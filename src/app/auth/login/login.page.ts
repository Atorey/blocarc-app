import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserLogin } from 'src/app/users/interfaces/user';
import { SelfAuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  userLogin: UserLogin = {
    email: '',
    password: '',
  };

  constructor(
    private authService: SelfAuthService,
    private alertCtrl: AlertController,
    private nav: NavController
  ) {}

  login(): void {
    this.authService.login(this.userLogin).subscribe(
      () => {
        this.nav.navigateRoot(['/home']);
        this.userLogin = {
          email: '',
          password: '',
        };
      },
      async () => {
        (
          await this.alertCtrl.create({
            header: 'Error de inicio de sesión',
            message: 'Correo y/o contraseña incorrectos',
            buttons: ['Ok'],
          })
        ).present();
      }
    );
  }
}
