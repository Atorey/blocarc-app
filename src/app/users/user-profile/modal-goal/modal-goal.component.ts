import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BouldersService } from 'src/app/boulders/services/boulders.service';
import { Goal } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-modal-goal',
  templateUrl: './modal-goal.component.html',
  styleUrls: ['./modal-goal.component.scss'],
})
export class ModalGoalComponent {
  @Input() goal;
  @Input() grades;
  userGoal: Goal = {
    goal: {
      boulders: 0,
      grades: [
        {
          grade: '',
          boulders: 0,
        },
      ],
    },
  };
  addCard = 0;

  constructor(
    public modalCtrl: ModalController,
    private bouldersService: BouldersService,
    private usersService: UsersService,
    private toast: ToastController
  ) {}

  ionViewWillEnter() {
    this.getGoal();
  }

  close() {
    this.modalCtrl.dismiss({ goal: this.userGoal });
  }

  getGoal() {
    if (Object.keys(this.goal).length === 0 ? true : false) {
      this.userGoal = {
        goal: {
          boulders: 0,
          grades: [
            {
              grade: '',
              boulders: 0,
            },
          ],
        },
      };
    } else {
      this.userGoal = this.goal;
      this.addCard = this.userGoal.goal.grades.length - 1;
    }
  }

  addGrade() {
    this.addCard++;
    this.userGoal.goal.grades.push({
      grade: '',
      boulders: 0,
    });
  }

  changeLevel(range, index) {
    this.userGoal.goal.grades[index].boulders = range.detail.value;
  }

  changeGoalBoulderLevel(range, index) {
    this.userGoal.goal.boulders = range.detail.value;
  }

  saveGoal() {
    this.usersService.postGoal(this.userGoal).subscribe(
      async () => {
        (
          await this.toast.create({
            duration: 3000,
            position: 'bottom',
            message: 'Nuevo objetivo guardado!',
            color: 'success',
          })
        ).present();
      },
      async (error) => {
        (
          await this.toast.create({
            duration: 3000,
            position: 'bottom',
            message: '¡Error!',
            color: 'error',
          })
        ).present();
      }
    );
  }
}
