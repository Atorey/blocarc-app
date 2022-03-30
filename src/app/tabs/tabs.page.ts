import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectedTab: string;

  @ViewChild('tabs', { static: false }) tabs: IonTabs;

  constructor() { }

  setCurrentTab(): void {
    this.selectedTab = this.tabs.getSelected();
  }

  isActive(tab: string) {
    return tab === this.selectedTab;
  }
}
