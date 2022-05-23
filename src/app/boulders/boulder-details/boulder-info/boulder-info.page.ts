import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Chart, registerables } from 'node_modules/chart.js';
import { Achievement, Boulder } from '../../interfaces/boulder';
import { BouldersService } from '../../services/boulders.service';
import { BoulderDetailsPage } from '../boulder-details.page';
import { ModalCompleteBoulderComponent } from '../modal-complete-boulder/modal-complete-boulder.component';

@Component({
  selector: 'app-boulder-info',
  templateUrl: './boulder-info.page.html',
  styleUrls: ['./boulder-info.page.scss'],
})
export class BoulderInfoPage implements OnInit {
  boulder: Boulder;
  achievements: Achievement[];
  boulderImage = '';
  formatDate = '';
  percent5 = 0;
  percent4 = 0;
  percent3 = 0;
  percent2 = 0;
  percent1 = 0;
  grades = [];
  attepm1 = 0;
  attepm2 = 0;
  attepm3 = 0;
  attepmMore = 0;
  totalValorations = 0;
  achievement: Achievement = {
    date: new Date().toISOString().substring(0, 10),
    attemps: 1,
    comment: '',
    video: '',
    valoration: 0,
  };

  constructor(
    @Inject(BoulderDetailsPage) private parentComponent: BoulderDetailsPage,
    public modalCtrl: ModalController,
    private bouldersService: BouldersService,
    private toast: ToastController
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.parentComponent.boulder$.subscribe((boulder) => {
      this.boulder = boulder;
      this.boulderImage = 'http://localhost:8080/' + boulder.image;
      this.formatDate = new Intl.DateTimeFormat('es-ES').format(
        new Date(this.boulder.creationDate)
      );
    });

    this.getAchievements();
  }

  createChart() {
    const chartExist = Chart.getChart('triesChart');
    if (chartExist !== undefined) {
      chartExist.destroy();
    }

    const triesChart = new Chart('triesChart', {
      type: 'pie',
      data: {
        labels: ['Flash', '2º intento', '3er intento', 'Más de 3 intentos'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [this.attepm1, this.attepm2, this.attepm3, this.attepmMore],
            backgroundColor: ['#f2cf66', '#ff9f40', '#f23d4c', '#5a2642'],
            borderWidth: 0,
          },
        ],
      },
    });
  }

  getAchievements() {
    this.bouldersService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      .getAchievements(this.boulder['_id'])
      .subscribe((achievements) => {
        this.achievements = achievements;
        this.totalValorations = achievements.filter(
          (item) => !!item.valoration
        ).length;
        this.calculatePercents();
        this.calculateGrades();
        this.calculateAttemps();

        this.createChart();
      });
  }

  calculatePercents() {
    let fiveValoration = 0;
    let fourValoration = 0;
    let threeValoration = 0;
    let twoValoration = 0;
    let oneValoration = 0;

    this.achievements.forEach((achievement) => {
      switch (achievement.valoration) {
        case 5:
          fiveValoration++;
          break;
        case 4:
          fourValoration++;
          break;
        case 3:
          threeValoration++;
          break;
        case 2:
          twoValoration++;
          break;
        case 1:
          oneValoration++;
          break;
      }
    });

    this.percent5 = Math.trunc((fiveValoration * 100) / this.totalValorations);
    this.percent4 = Math.trunc((fourValoration * 100) / this.totalValorations);
    this.percent3 = Math.trunc((threeValoration * 100) / this.totalValorations);
    this.percent2 = Math.trunc((twoValoration * 100) / this.totalValorations);
    this.percent1 = Math.trunc((oneValoration * 100) / this.totalValorations);
  }

  calculateGrades() {
    const uniqueGrades = [
      ...new Set(this.achievements.map((achievement) => achievement.grade)),
    ];

    uniqueGrades.forEach((grade) => {
      const repetitions = this.achievements.filter(
        (achievement) => achievement.grade === grade
      );
      this.grades.push({
        value: grade,
        percent: Math.trunc(
          (repetitions.length * 100) / this.achievements.length
        ),
      });
    });

    this.achievements.forEach((achievement) => {});
  }

  calculateAttemps() {
    this.achievements.forEach((achievement) => {
      switch (achievement.attemps) {
        case 1:
          this.attepm1++;
          break;
        case 2:
          this.attepm2++;
          break;
        case 3:
          this.attepm3++;
          break;
        default:
          this.attepmMore++;
          break;
      }
    });
  }

  completeBoulder() {
    this.openCompleteBoulderModal();
  }

  async openCompleteBoulderModal() {
    const modal = await this.modalCtrl.create({
      component: ModalCompleteBoulderComponent,
      componentProps: { achievement: this.achievement },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.achievement) {
      this.bouldersService
        // eslint-disable-next-line @typescript-eslint/dot-notation
        .saveAchievement(this.achievement, this.boulder['_id'])
        .subscribe({
          next: async (wall) => {
            this.achievement = {
              date: new Date().toISOString().substring(0, 10),
              attemps: 1,
              grade: '',
              comment: '',
              video: '',
              valoration: 0,
            };
            (
              await this.toast.create({
                duration: 3000,
                position: 'bottom',
                message: '¡Pared guardada!',
                color: 'success',
              })
            ).present();
          },
          error: async () => {
            (
              await this.toast.create({
                duration: 3000,
                position: 'bottom',
                message: 'Se ha producido un error',
                color: 'danger',
              })
            ).present();
          },
        });
    } else {
      this.toast.create({
        duration: 3000,
        position: 'bottom',
        message: '¡Error!',
        color: 'danger',
      });
    }
  }
}
