import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';

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
        GoogleAuth.initialize();
      });
    }
  }
}
