import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticStarRatingComponent } from '../static-star-rating/static-star-rating.component';

@NgModule({
  declarations: [StaticStarRatingComponent],
  imports: [CommonModule],
  exports: [StaticStarRatingComponent],
})
export class StaticRatingModule {}
