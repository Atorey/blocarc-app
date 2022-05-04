import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  electedTab: string;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab: any;

  constructor() {}

  setCurrentTab(): void {
    this.selectedTab = this.tabs.getSelected();
  }

  isActive(tab: string) {
    return tab === this.selectedTab;
  }
}
