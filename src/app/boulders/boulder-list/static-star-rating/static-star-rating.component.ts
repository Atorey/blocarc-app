import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-star-rating',
  templateUrl: './static-star-rating.component.html',
  styleUrls: ['./static-star-rating.component.scss'],
})
export class StaticStarRatingComponent implements OnInit {
  @Input() valoration;
  points = [];
  noPoints = [];
  decimalValoration = false;
  constructor() {}

  ngOnInit() {
    this.setStarValoration();
  }

  setStarValoration() {
    this.points = Array(Math.floor(this.valoration)).fill(1);
    this.noPoints = Array(5 - this.points.length).fill(0);
  }
}
