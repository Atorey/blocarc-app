import { Component, OnInit } from '@angular/core';
import {
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';
import { ModalController, NavController } from '@ionic/angular';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { SelfAuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent implements OnInit {
  constructor(
    private nav: NavController,
    public modalCtrl: ModalController,
    private socialAuthService: AuthService,
    private authService: SelfAuthService
  ) {}

  ngOnInit() {
    /* const resp =
      (await FacebookLogin.getCurrentAccessToken()) as FacebookLoginResponse;
    if (resp.accessToken) {
      this.userSocialLogin.token = resp.accessToken.token;
    } */
  }

  login() {
    this.nav.navigateForward(['/auth/login']);
    this.modalCtrl.dismiss();
  }

  /* googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.authService
        .postSocialLogin({
          username: user.name,
          email: user.email,
          avatar: user.photoUrl,
          id: user.id,
        })
        .subscribe({
          next: () => {
            this.nav.navigateRoot(['/home']);
          },
          error: () => {
            console.log('Error login google');
          },
        });
    });
  } */

  /* facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.authService
        .postSocialLogin({
          username: user.name,
          email: user.email,
          avatar: user.photoUrl,
          id: user.id,
        })
        .subscribe({
          next: () => {
            this.nav.navigateRoot(['/home']);
          },
          error: () => {
            console.log('Error login google');
          },
        });
    });
  } */

  register() {
    this.nav.navigateForward(['/auth/register']);
    this.modalCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
