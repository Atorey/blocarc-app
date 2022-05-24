import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTabs, NavController } from '@ionic/angular';
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
    private route: ActivatedRoute,
    private nav: NavController,
    public router: Router
  ) {
    this.boulder$ = this.bouldersService
      .getBoulder(this.route.snapshot.params.id)
      .pipe(shareReplay(1));
  }

  ngOnInit() {
    this.boulder$.subscribe({
      next: (boulder) => {
        this.boulder = boulder;
      },
      error: (error) => {
        this.router.navigate(['/boulders']);
      },
    });
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
