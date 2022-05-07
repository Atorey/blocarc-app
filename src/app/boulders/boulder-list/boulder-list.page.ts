import { Component, OnInit } from '@angular/core';
import { Boulder } from '../interfaces/boulder';
import { BouldersService } from '../services/boulders.service';

@Component({
  selector: 'app-boulder-list',
  templateUrl: './boulder-list.page.html',
  styleUrls: ['./boulder-list.page.scss'],
})
export class BoulderListPage implements OnInit {
  boulders: Boulder[] = [];
  search = '';

  constructor(private bouldersService: BouldersService) {}

  ngOnInit() {
    this.getBoulders();
  }

  getBoulders() {
    this.bouldersService.getBoulders().subscribe((boulders) => {
      this.boulders = boulders;
    });
  }
}
