import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { GoogleLoginProvider } from 'angularx-social-login';
import { UserLogin } from 'src/app/users/interfaces/user';
import { SelfAuthService } from '../services/auth.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  step = 0;
  userLogin: UserLogin = {
    email: '',
    password: '',
  };

  constructor(
    private authService: SelfAuthService,
    private alertCtrl: AlertController,
    private nav: NavController
  ) {}

  ngOnInit() {}

  login(): void {
    this.authService.login(this.userLogin).subscribe(
      () => {
        this.step = 0;
        this.nav.navigateRoot(['/home']);
        this.userLogin = {
          email: '',
          password: '',
        };
      },
      async (error) => {
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

  close() {
    this.nav.navigateRoot(['/welcome']);
  }

  nextStep() {
    this.step++;
  }

  goBack() {
    this.step--;
    this.userLogin = {
      email: '',
      password: '',
    };
  }
}
