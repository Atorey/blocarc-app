import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Achievement, Boulder } from '../boulders/interfaces/boulder';
import { BouldersService } from '../boulders/services/boulders.service';
import { Goal, User } from '../users/interfaces/user';
import { UsersService } from '../users/services/users.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage {
  week: string;
  updateWeek = 0;
  isThisWeek = true;
  userGoal: Goal;
  chartTotalData = [0, 0, 0, 0, 0, 0, 0];
  chartGradesData = [];
  daysWeek: string[];
  achievements: Achievement[];
  loaded = false;
  dateFirst: string;
  dateLast: string;
  totalBouldersAchieved = 0;
  uniqueDays: string[];
  uniqueGrades: string[];
  screen = 'total';
  gradesLabel: string[];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private bouldersService: BouldersService
  ) {
    Chart.register(...registerables);
  }

  ionViewWillEnter() {
    this.getGoal();
    this.getWeekToShow();
  }

  getWeekToShow() {
    const currentDate = new Date();
    const dateToShow = new Date();

    dateToShow.setDate(dateToShow.getDate() - this.updateWeek);

    this.isThisWeek = dateToShow.toDateString() === currentDate.toDateString();

    const first = dateToShow.getDate() - dateToShow.getDay() + 1;
    const last = first + 6;

    const firstday = new Date(dateToShow.setDate(first));
    const lastday = new Date(dateToShow.setDate(last));

    if (lastday < firstday) {
      lastday.setMonth(firstday.getMonth() + 1);
    }

    this.dateFirst = firstday.toISOString().substring(0, 10).replace(/-/g, '/');
    this.dateLast = lastday.toISOString().substring(0, 10).replace(/-/g, '/');

    const fMonth = firstday.toLocaleString('default', { month: 'long' });
    const lMonth = lastday.toLocaleString('default', { month: 'long' });

    if (
      fMonth === lMonth &&
      firstday.getFullYear() === currentDate.getFullYear()
    ) {
      this.week = `${firstday.getDate()}-${lastday.getDate()} de ${fMonth}`;
    } else if (
      fMonth === lMonth &&
      firstday.getFullYear() !== currentDate.getFullYear()
    ) {
      this.week = `${firstday.getDate()}-${lastday.getDate()} de ${fMonth} de ${firstday.getFullYear()}`;
    } else if (
      fMonth !== lMonth &&
      firstday.getFullYear() === currentDate.getFullYear()
    ) {
      this.week = `${firstday.getDate()} de ${fMonth}-${lastday.getDate()} de ${lMonth}`;
    } else if (
      fMonth !== lMonth &&
      firstday.getFullYear() !== lastday.getFullYear()
    ) {
      // eslint-disable-next-line max-len
      this.week = `${firstday.getDate()} de ${fMonth} de ${firstday.getFullYear()}-${lastday.getDate()} de ${lMonth} de ${lastday.getFullYear()}`;
    } else if (
      fMonth !== lMonth &&
      firstday.getFullYear() !== currentDate.getFullYear()
    ) {
      this.week = `${firstday.getDate()} de ${fMonth}-${lastday.getDate()} de ${lMonth} de ${lastday.getFullYear()}`;
    }

    this.getAchievements();
  }

  getGoal() {
    this.usersService.getGoal().subscribe({
      next: (goal) => {
        this.userGoal = goal;
      },
      error: (error) => {
        this.router.navigate(['/home']);
      },
    });
  }

  createTotalChart() {
    const chartExist = Chart.getChart('weekGoalChart');
    if (chartExist !== undefined) {
      chartExist.destroy();
    }

    const weekGoalChart = new Chart('weekGoalChart', {
      type: 'bar',
      data: {
        labels: ['lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.'],
        datasets: [
          {
            data: this.chartTotalData,
            backgroundColor: '#f5dc09',
            barThickness: 12,
            borderRadius: { topRight: 2, topLeft: 2 },
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  createGradesChart() {
    const cssvar = (color) =>
      getComputedStyle(document.documentElement).getPropertyValue(color);

    const chartExist = Chart.getChart('gradesGoalChart');
    if (chartExist !== undefined) {
      chartExist.destroy();
    }

    const gradesGoalChart = new Chart('gradesGoalChart', {
      type: 'bar',
      data: {
        labels: this.gradesLabel,
        datasets: [
          {
            data: this.chartGradesData,
            backgroundColor: this.userGoal.goal.grades.map((grade) => {
              grade.grade = grade.grade.includes('+')
                ? grade.grade.replace('+', 'm')
                : grade.grade;

              return cssvar(`--ion-color-${grade.grade}`);
            }),
            barThickness: 12,
            borderRadius: { topRight: 2, topLeft: 2 },
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  previousWeek() {
    this.loaded = false;
    this.updateWeek = this.updateWeek + 7;
    this.getWeekToShow();
    this.chartTotalData = [0, 0, 0, 0, 0, 0, 0];
    this.chartGradesData = [];
  }

  nextWeek() {
    this.loaded = false;
    this.updateWeek = this.updateWeek - 7;
    this.getWeekToShow();
    this.chartTotalData = [0, 0, 0, 0, 0, 0, 0];
    this.chartGradesData = [];
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
            this.loaded = true;
            this.getDaysOfWeek();
            this.getGrades();
            this.fillTotalChart();
            this.fillGradesChart();
            this.createTotalChart();
            this.createGradesChart();
          },
          error: () => {
            this.achievements = undefined;
            this.totalBouldersAchieved = 0;
            this.loaded = true;
          },
        });
    });
  }

  getDaysOfWeek() {
    this.uniqueDays = [
      ...new Set(this.achievements.map((achievement) => achievement.date)),
    ];

    console.log(this.uniqueDays);
  }

  getGrades() {
    this.uniqueGrades = [
      ...new Set(
        this.achievements.map((achievement) => achievement.boulder.grade)
      ),
    ];

    this.gradesLabel = this.userGoal.goal.grades.map((grade) => grade.grade);
  }

  fillTotalChart() {
    this.achievements.forEach((achievement) => {
      const date = new Date(achievement.date).toLocaleString('default', {
        weekday: 'long',
      });
      switch (date) {
        case 'lunes':
          this.chartTotalData[0]++;
          break;
        case 'martes':
          this.chartTotalData[1]++;
          break;
        case 'miércoles':
          this.chartTotalData[2]++;
          break;
        case 'jueves':
          this.chartTotalData[3]++;
          break;
        case 'viernes':
          this.chartTotalData[4]++;
          break;
        case 'sábado':
          this.chartTotalData[5]++;
          break;
        case 'domingo':
          this.chartTotalData[6]++;
          break;
      }
    });
  }

  fillGradesChart() {
    this.gradesLabel.forEach((gradeLabel) => {
      const count = this.achievements.filter(
        (achievement) => achievement.boulder.grade === gradeLabel
      ).length;
      this.chartGradesData.push(count);
    });
  }

  toggleScreen(screenToGo: string) {
    this.screen = screenToGo;
  }
}
