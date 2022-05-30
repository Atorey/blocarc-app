import { Component, OnInit } from '@angular/core';
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
  grades = [];
  addCard = 0;

  constructor(
    public modalCtrl: ModalController,
    private bouldersService: BouldersService,
    private usersService: UsersService,
    private toast: ToastController
  ) {}

  ionViewWillEnter() {
    this.getGoal();
    this.getGrades();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getGrades() {
    this.bouldersService.getGrades().subscribe((grades) => {
      this.grades = grades;
    });
  }

  getGoal() {
    this.usersService.getGoal().subscribe({
      next: (goal) => {
        console.log(goal);
        if (Object.keys(goal).length === 0 ? true : false) {
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
          this.userGoal = goal;
          this.addCard = this.userGoal.goal.grades.length - 1;
        }
      },
      error: () => {
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
      },
    });
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
