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
  goal: Goal;
  chartData = [0, 0, 0, 0, 0, 0, 0];
  daysWeek: string[];
  achievements: Achievement[];
  loaded = false;
  dateFirst: string;
  dateLast: string;
  totalBouldersAchieved = 0;
  uniqueDays: string[];
  uniqueGrades: string[];
  screen = 'total';

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

    this.dateFirst = firstday.toISOString().substring(0, 10).replace(/-/g, '/');
    this.dateLast = lastday.toISOString().substring(0, 10).replace(/-/g, '/');

    this.getAchievements();

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
  }

  getGoal() {
    this.usersService.getGoal().subscribe({
      next: (goal) => {
        this.goal = goal;
      },
      error: (error) => {
        this.router.navigate(['/home']);
      },
    });
  }

  createChart() {
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
            data: this.chartData,
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

  previousWeek() {
    this.loaded = false;
    this.updateWeek = this.updateWeek + 7;
    this.getWeekToShow();
    this.chartData = [0, 0, 0, 0, 0, 0, 0];
  }

  nextWeek() {
    this.loaded = false;
    this.updateWeek = this.updateWeek - 7;
    this.getWeekToShow();
    this.chartData = [0, 0, 0, 0, 0, 0, 0];
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
            this.fillChart();
            this.createChart();
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
  }

  getGrades() {
    this.uniqueGrades = [
      ...new Set(
        this.achievements.map((achievement) => achievement.boulder.grade)
      ),
    ];
  }

  fillChart() {
    this.achievements.forEach((achievement) => {
      const date = new Date(achievement.date).toLocaleString('default', {
        weekday: 'long',
      });
      switch (date) {
        case 'lunes':
          this.chartData[0]++;
          break;
        case 'martes':
          this.chartData[1]++;
          break;
        case 'miércoles':
          this.chartData[2]++;
          break;
        case 'jueves':
          this.chartData[3]++;
          break;
        case 'viernes':
          this.chartData[4]++;
          break;
        case 'sábado':
          this.chartData[5]++;
          break;
        case 'domingo':
          this.chartData[6]++;
          break;
      }
    });
  }

  toggleScreen(screenToGo: string) {
    this.screen = screenToGo;
  }
}
