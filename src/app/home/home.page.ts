import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Boulder, Hold } from '../boulders/interfaces/boulder';
import { BouldersService } from '../boulders/services/boulders.service';
import { PullUp } from '../users/interfaces/user';
import { UsersService } from '../users/services/users.service';

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

  constructor(
    private bouldersService: BouldersService,
    private usersService: UsersService
  ) {}

  ionViewWillEnter() {
    this.getPullUps();
    this.getLastBoulderAchieved();
  }

  getPullUps() {
    this.usersService.getPullUps().subscribe((pullUps) => {
      if (pullUps.pullUps.reps !== 0) {
        this.pullUps = pullUps;
      }
      console.log(pullUps);
    });
  }

  getLastBoulderAchieved() {
    this.usersService.getLastAchieved().subscribe((achievement) => {
      if (achievement) {
        this.lastBoulderAchieved = achievement.boulder;
        this.lastBoulderImage =
          'https://blocarc-services-production.up.railway.app/' +
          this.lastBoulderAchieved.image;

        this.dateLastAchieved = new Intl.DateTimeFormat('es-ES').format(
          new Date(achievement.date)
        );

        this.holds = this.lastBoulderAchieved.holds;
      } else {
        this.lastBoulderAchieved = undefined;
      }

      this.load = true;
    });
  }
}
