import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { UserLogin } from 'src/app/users/interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLogin: UserLogin = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private nav: NavController,
    private ngZone: NgZone
  ) {}

  ngOnInit() {}

  login(): void {
    this.authService.login(this.userLogin).subscribe(
      () => this.nav.navigateRoot(['/home']),
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
}
