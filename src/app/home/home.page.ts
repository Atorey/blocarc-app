import { Component, OnInit } from '@angular/core';
import { Boulder } from '../boulders/interfaces/boulder';
import { BouldersService } from '../boulders/services/boulders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  boulders: Boulder[];
  constructor(private bouldersService: BouldersService) { }

  ngOnInit() {
    this.bouldersService
      .getBoulders()
      .subscribe((boulders) => (this.boulders = boulders));
  }

}
