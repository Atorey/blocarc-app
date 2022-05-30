import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { IonTabs, Platform } from '@ionic/angular';
import { Chart } from 'chart.js';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {}

  initializeApp() {
    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        /*  SplashScreen.hide();
        StatusBar.setBackgroundColor({ color: '#3880ff' });
        StatusBar.setStyle({ style: Style.Dark }); */
        GoogleAuth.initialize();
      });
    }
  }
}
