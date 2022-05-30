import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BouldersService } from 'src/app/boulders/services/boulders.service';

@Component({
  selector: 'app-modal-goal',
  templateUrl: './modal-goal.component.html',
  styleUrls: ['./modal-goal.component.scss'],
})
export class ModalGoalComponent implements OnInit {
  goal = 0;
  grades = [];
  addCard = 0;

  goalGrades = [
    {
      grade: '6a',
      boulders: 0,
    },
  ];

  constructor(
    public modalCtrl: ModalController,
    private bouldersService: BouldersService
  ) {}

  ngOnInit() {
    this.getGrades();

    console.log(this.goalGrades[0].boulders);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getGrades() {
    this.bouldersService.getGrades().subscribe((grades) => {
      this.grades = grades;
    });
  }

  addGrade() {
    this.addCard++;
    this.goalGrades.push({
      grade: '',
      boulders: 0,
    });
  }

  changeLevel(range, index) {
    this.goalGrades[index].boulders = range.detail.value;
  }
}
