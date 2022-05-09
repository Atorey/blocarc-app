import { Component, Inject, OnInit } from '@angular/core';
import { Boulder } from '../../interfaces/boulder';
import { BoulderDetailsPage } from '../boulder-details.page';

@Component({
  selector: 'app-boulder-view',
  templateUrl: './boulder-view.page.html',
  styleUrls: ['./boulder-view.page.scss'],
})
export class BoulderViewPage implements OnInit {
  boulder: Boulder;
  boulderImage = '';
  holds = [];

  constructor(
    @Inject(BoulderDetailsPage) private parentComponent: BoulderDetailsPage
  ) {}

  ngOnInit() {
    this.parentComponent.boulder$.subscribe((boulder) => {
      this.boulder = boulder;
      this.boulderImage = 'http://localhost:8080/' + boulder.image;
      this.holds = this.boulder.holds;
    });
  }
}
