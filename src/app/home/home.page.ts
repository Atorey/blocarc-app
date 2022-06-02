/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { Achievement, Boulder, Hold } from '../boulders/interfaces/boulder';
import { BouldersService } from '../boulders/services/boulders.service';
import { Goal, PullUp } from '../users/interfaces/user';
import { UsersService } from '../users/services/users.service';
import { ModalGoalComponent } from '../users/user-profile/modal-goal/modal-goal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  boulders: Boulder[];
  pullUps: PullUp;
  lastBoulderAchieved: Boulder;
  lastBoulderImage = '';
  dateLastAchieved: string;
  holds: Hold[];
  load = false;
  progressGoal;
  todayProgressGoal;
  week: string;
  updateWeek = 0;
  isThisWeek = true;
  userGoal: Goal;
  achievements: Achievement[];
  dateFirst: string;
  dateLast: string;
  totalBouldersAchieved = 0;
  currentDate = new Date();
  totalTodayBoulders = 0;
  grades = [];

  constructor(
    private bouldersService: BouldersService,
    private usersService: UsersService,
    public modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.getPullUps();
    this.getLastBoulderAchieved();
    this.getGoal();
    this.getWeekToShow();
  }

  getPullUps() {
    this.usersService.getPullUps().subscribe((pullUps) => {
      if (pullUps.pullUps.reps !== 0) {
        this.pullUps = pullUps;
      }
    });
  }

  getLastBoulderAchieved() {
    this.usersService.getLastAchieved().subscribe((achievement) => {
      if (achievement) {
        this.lastBoulderAchieved = achievement.boulder;
        this.lastBoulderImage = `${environment.baseUrl_api}/${this.lastBoulderAchieved.image}`;

        this.dateLastAchieved = new Intl.DateTimeFormat('es-ES').format(
          new Date(achievement.date)
        );

        this.holds = this.lastBoulderAchieved.holds;
      } else {
        this.lastBoulderAchieved = undefined;
      }
    });
  }

  getGoal() {
    this.usersService.getGoal().subscribe({
      next: (goal) => {
        this.userGoal = goal;
      },
    });
  }

  getWeekToShow() {
    const dateToShow = new Date();

    dateToShow.setDate(dateToShow.getDate() - this.updateWeek);

    this.isThisWeek =
      dateToShow.toDateString() === this.currentDate.toDateString();

    const first = dateToShow.getDate() - dateToShow.getDay() + 1;
    const last = first + 6;

    const firstday = new Date(dateToShow.setDate(first));
    const lastday = new Date(dateToShow.setDate(last));

    this.dateFirst = firstday.toISOString().substring(0, 10).replace(/-/g, '/');
    this.dateLast = lastday.toISOString().substring(0, 10).replace(/-/g, '/');

    const fMonth = firstday.toLocaleString('default', { month: 'short' });
    const lMonth = lastday.toLocaleString('default', { month: 'short' });

    if (
      fMonth === lMonth &&
      firstday.getFullYear() === this.currentDate.getFullYear()
    ) {
      this.week = `${firstday.getDate()} - ${lastday.getDate()} ${fMonth}.`;
    } else if (
      fMonth === lMonth &&
      firstday.getFullYear() !== this.currentDate.getFullYear()
    ) {
      this.week = `${firstday.getDate()} - ${lastday.getDate()} ${fMonth}. ${firstday.getFullYear()}`;
    } else if (
      fMonth !== lMonth &&
      firstday.getFullYear() === this.currentDate.getFullYear()
    ) {
      this.week = `${firstday.getDate()} ${fMonth}. - ${lastday.getDate()} ${lMonth}.`;
    } else if (
      fMonth !== lMonth &&
      firstday.getFullYear() !== lastday.getFullYear()
    ) {
      // eslint-disable-next-line max-len
      this.week = `${firstday.getDate()} ${fMonth}. ${firstday.getFullYear()}-${lastday.getDate()} ${lMonth}. ${lastday.getFullYear()}`;
    } else if (
      fMonth !== lMonth &&
      firstday.getFullYear() !== this.currentDate.getFullYear()
    ) {
      this.week = `${firstday.getDate()} ${fMonth}. - ${lastday.getDate()} ${lMonth}. ${lastday.getFullYear()}`;
    }

    this.getAchievements();
  }

  getAchievements() {
    this.usersService.getUserMe().subscribe((user) => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.usersService
        .getAchievementsBetweenDates(this.dateFirst, this.dateLast)
        .subscribe({
          next: (achievements) => {
            this.achievements = achievements;
            this.totalBouldersAchieved = this.achievements.length;
            this.load = true;
            this.getProgressGoal();
            this.getTodayAchievements();

            this.bouldersService
              .getGrades()
              .subscribe((grades) => (this.grades = grades));
          },
          error: () => {
            this.achievements = undefined;
            this.totalBouldersAchieved = 0;
            this.load = true;
          },
        });
    });
  }

  calculatePercentage() {
    return this.totalBouldersAchieved / this.userGoal.goal.boulders;
  }

  getProgressGoal() {
    this.progressGoal = [];
    this.todayProgressGoal = [];

    if (this.userGoal.goal) {
      this.userGoal.goal.grades.forEach((goal) => {
        const nameGrade = goal.grade;
        const color = getComputedStyle(
          document.documentElement
        ).getPropertyValue(
          `--ion-color-${
            goal.grade.includes('+') ? goal.grade.replace('+', 'm') : goal.grade
          }`
        );

        const matches = this.achievements.filter(
          (achievement) => achievement.boulder.grade === goal.grade
        ).length;

        const percent = (matches / goal.boulders) * 100;

        this.progressGoal.push({
          grade: nameGrade,
          color: color,
          percent: percent,
          total: matches,
        });
      });

      this.userGoal.goal.grades.forEach((goal) => {
        const nameGrade = goal.grade;
        const color = getComputedStyle(
          document.documentElement
        ).getPropertyValue(
          `--ion-color-${
            goal.grade.includes('+') ? goal.grade.replace('+', 'm') : goal.grade
          }`
        );

        const matches = this.achievements.filter(
          (achievement) =>
            achievement.boulder.grade === goal.grade &&
            new Date(
              new Date(achievement.date).setHours(0, 0, 0, 0)
            ).toISOString() ===
              new Date(this.currentDate.setHours(0, 0, 0, 0)).toISOString()
        ).length;

        const percent = (matches / goal.boulders) * 100;

        if (matches > 0) {
          this.todayProgressGoal.push({
            grade: nameGrade,
            color: color,
            percent: percent,
            total: matches,
          });
        }
      });
    }
  }

  getTodayAchievements() {
    this.totalTodayBoulders = this.achievements.filter(
      (achievement) =>
        new Date(
          new Date(achievement.date).setHours(0, 0, 0, 0)
        ).toISOString() ===
        new Date(this.currentDate.setHours(0, 0, 0, 0)).toISOString()
    ).length;
  }

  async openGoalModal() {
    const modal = await this.modalCtrl.create({
      component: ModalGoalComponent,
      componentProps: {
        goal: this.userGoal,
        grades: this.grades,
      },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data.goal) {
      this.userGoal = result.data.goal;
      this.getProgressGoal();
    }
  }
}
