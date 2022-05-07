import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab: string;
  showTabs = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(event.url);
        if (event.url === '/home' || event.url === '/boulders/explore') {
          this.showTabs = true;
        } else {
          this.showTabs = false;
        }
      });
  }

  setCurrentTab(): void {
    this.selectedTab = this.tabs.getSelected();
  }

  isActive(tab: string) {
    return tab === this.selectedTab;
  }
}
