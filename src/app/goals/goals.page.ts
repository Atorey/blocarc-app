import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Achievement } from '../boulders/interfaces/boulder';
import { BouldersService } from '../boulders/services/boulders.service';
import { User } from '../users/interfaces/user';
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
  goal: number;
  chartData = [0, 0, 0, 0, 0, 0, 0];
  daysWeek: string[];
  achievements: Achievement[];
  loaded = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private bouldersService: BouldersService
  ) {
    Chart.register(...registerables);
  }

  ionViewWillEnter() {
    this.getGoal();
    this.getAchievements();
    this.createChart();
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
    this.updateWeek = this.updateWeek + 7;
    this.getWeekToShow();
  }

  nextWeek() {
    this.updateWeek = this.updateWeek - 7;
    this.getWeekToShow();
  }

  getAchievements() {
    this.usersService.getUserMe().subscribe((user) => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.bouldersService.getAchievements(user['_id']).subscribe({
        next: (achievements) => {
          this.achievements = achievements;
        },
      });
    });
  }
}
