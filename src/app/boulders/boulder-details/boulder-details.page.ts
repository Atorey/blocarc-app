import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Boulder } from '../interfaces/boulder';
import { BouldersService } from '../services/boulders.service';

@Component({
  selector: 'app-boulder-details',
  templateUrl: './boulder-details.page.html',
  styleUrls: ['./boulder-details.page.scss'],
})
export class BoulderDetailsPage implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab: string;
  boulder$: Observable<Boulder>;
  boulder: Boulder;

  constructor(
    private bouldersService: BouldersService,
    private route: ActivatedRoute
  ) {
    this.boulder$ = this.bouldersService
      .getBoulder(this.route.snapshot.params.id)
      .pipe(shareReplay(1));
  }

  ngOnInit() {
    this.boulder$.subscribe((boulder) => (this.boulder = boulder));
  }

  getBoulder(): Observable<Boulder> {
    return this.boulder$;
  }

  setCurrentTab(): void {
    this.selectedTab = this.tabs.getSelected();
  }

  isActive(tab: string) {
    return tab === this.selectedTab;
  }
}
