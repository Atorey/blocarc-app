import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BouldersService } from '../../services/boulders.service';

@Component({
  selector: 'app-modal-complete-boulder',
  templateUrl: './modal-complete-boulder.component.html',
  styleUrls: ['./modal-complete-boulder.component.scss'],
})
export class ModalCompleteBoulderComponent implements OnInit {
  @Input() achievement;

  grades = [];

  constructor(
    public modalCtrl: ModalController,
    private bouldersService: BouldersService
  ) {}

  ngOnInit() {
    this.getGrades();
  }

  completeBoulder() {
    this.modalCtrl.dismiss({ changed: true, achievement: this.achievement });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getGrades() {
    this.bouldersService.getGrades().subscribe((grades) => {
      this.grades = grades;
    });
  }

  logRatingChange(rating) {
    this.achievement.valoration = rating;
  }
}
