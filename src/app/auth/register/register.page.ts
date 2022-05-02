import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    username: '',
    password: '',
    email: '',
  };
  password2 = '';
  email2 = '';

  constructor(
    private authService: AuthService,
    private toast: ToastController,
    private nav: NavController
  ) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.user).subscribe(async () => {
      (
        await this.toast.create({
          duration: 3000,
          position: 'bottom',
          message: '¡Usuario registrado!',
          color: 'success',
        })
      ).present();
      this.nav.navigateRoot(['/auth/login']);
    });
  }
}
