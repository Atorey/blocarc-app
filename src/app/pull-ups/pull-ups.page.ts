import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PullUp } from '../users/interfaces/user';
import { UsersService } from '../users/services/users.service';

@Component({
  selector: 'app-pull-ups',
  templateUrl: './pull-ups.page.html',
  styleUrls: ['./pull-ups.page.scss'],
})
export class PullUpsPage implements OnInit {
  pullUps = {
    reps: '',
    weight: '',
    ballast: '',
    intensity: '',
  };

  goal: PullUp = {
    pullUp: {
      reps: 0,
      intensity: 0,
      weight: 0,
      ballast: 0,
    },
  };

  step = 0;

  constructor(
    private usersService: UsersService,
    private alertCtrl: AlertController,
    private nav: NavController
  ) {}

  ngOnInit() {}

  calculateGoal() {
    const totalWeight = +this.pullUps.weight + +this.pullUps.ballast;

    const rm = Math.round(totalWeight / (1.0278 - 0.0278 * +this.pullUps.reps));

    this.goal.pullUp.weight = Math.round((+this.pullUps.intensity * rm) / 100);
    this.goal.pullUp.reps = Math.trunc(
      36.9712 - (35.9712 * this.goal.pullUp.weight) / rm
    );
    this.goal.pullUp.intensity = +this.pullUps.intensity;
    this.goal.pullUp.ballast = this.goal.pullUp.weight - +this.pullUps.weight;
  }

  nextStep() {
    this.step++;
    this.calculateGoal();
  }

  goBack() {
    this.step--;
  }

  savePullUps() {
    this.usersService.postPullUps(this.goal).subscribe(
      () => {
        this.pullUps = {
          reps: '',
          weight: '',
          ballast: '',
          intensity: '',
        };
        this.step = 0;
        this.nav.navigateRoot(['/home']);
      },
      async (error) => {
        (
          await this.alertCtrl.create({
            header: 'Error',
            message: 'Se ha producido un error, vuelva a intentarlo más tarde',
            buttons: ['Ok'],
          })
        ).present();
      }
    );
  }
}
