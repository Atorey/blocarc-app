import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, IonTabs, NavController } from '@ionic/angular';
import { Boulder } from 'src/app/boulders/interfaces/boulder';
import { BouldersService } from 'src/app/boulders/services/boulders.service';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import { Chart, registerables } from 'node_modules/chart.js';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage {
  @ViewChild('segment', { static: false }) segment: IonSegment;
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

  userAvatar = '';
  selectedSegment = 'created';
  bouldersCreated: Boulder[];
  bouldersCompleted: Boulder[];
  totalBouldersCreated: number;
  totalBouldersCompleted: number;

  user: User = {
    email: '',
    username: '',
    password: '',
    avatar: '',
  };

  filterGrades = [
    { val: '4 - 4+', color: '4', isChecked: true },
    { val: '5 - 5+', color: '5', isChecked: true },
    { val: '6a - 6c+', color: '6a', isChecked: true },
    { val: '7a - 7c+', color: '7a', isChecked: true },
    { val: '8a - 8c+', color: '8a', isChecked: true },
    { val: '9a - 9b+', color: '9a', isChecked: true },
  ];

  gradesSelected = [4, 5, 6, 7, 8, 9];

  grades = {
    4: 1,
    '4+': 1,
    5: 1,
    '5+': 1,
    '6a': 1,
    '6a+': 1,
    '6b': 1,
    '6b+': 1,
    '6c': 1,
    '6c+': 1,
    '7a': 1,
    '7a+': 1,
    '7b': 1,
    '7b+': 1,
    '7c': 1,
    '7c+': 1,
    '8a': 1,
    '8a+': 1,
    '8b': 1,
    '8b+': 1,
    '8c': 1,
    '8c+': 1,
    '9a': 1,
    '9a+': 1,
    '9b': 1,
    '9b+': 1,
  };

  bouldersSaved = [
    { label: '4 - 4+', color: '4', val: '4', boulders: [] },
    { label: '5 - 5+', color: '5', val: '5', boulders: [] },
    { label: '6a - 6c+', color: '6a', val: '6', boulders: [] },
    { label: '7a - 7c+', color: '7a', val: '7', boulders: [] },
    { label: '8a - 8c+', color: '8a', val: '8', boulders: [] },
    { label: '9a - 9b+', color: '9a', val: '9', boulders: [] },
  ];

  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
    private nav: NavController,
    private bouldersService: BouldersService
  ) {
    Chart.register(...registerables);
  }

  ionViewWillEnter() {
    this.route.data.subscribe({
      next: (data) => {
        this.user = data.user;
        this.userAvatar = 'http://localhost:8080/' + this.user.avatar;
      },
      error: () => {
        this.nav.navigateRoot(['/']);
      },
    });
    this.getBoulders();
  }

  getBoulders() {
    this.bouldersService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      .getBouldersByCreator(this.user['_id'])
      .subscribe((boulders) => {
        this.bouldersCreated = boulders;
        this.totalBouldersCreated = this.bouldersCreated.length;
      });

    this.bouldersService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      .getBouldersAchieved(this.user['_id'])
      .subscribe((boulders) => {
        this.bouldersCompleted = boulders;
        this.totalBouldersCompleted = this.bouldersCompleted.length;
        this.fillGrades();
        this.createChart();
      });

    this.bouldersService
      // eslint-disable-next-line @typescript-eslint/dot-notation
      .getBouldersSaved(this.user['_id'])
      .subscribe((boulders) => {
        this.bouldersSaved.forEach((grade) => {
          grade.boulders = boulders.filter((boulder) =>
            boulder.grade.includes(grade.val)
          );
        });
      });
  }

  fillGrades() {
    Object.keys(this.grades).forEach((key) => {
      const repetitions = this.bouldersCompleted.filter(
        (boulder) => boulder.grade === key
      );
      this.grades[key] = repetitions.length;
    });
  }

  segmentChanged(ev: any) {
    this.selectedSegment = ev.detail.value;
  }

  isActive(segment: string) {
    return segment === this.selectedSegment;
  }

  createChart() {
    const chartExist = Chart.getChart('completedChart');
    if (chartExist !== undefined) {
      chartExist.destroy();
    }

    const completedChart = new Chart('completedChart', {
      type: 'doughnut',
      data: {
        labels: Object.keys(this.grades),
        datasets: [
          {
            data: Object.values(this.grades),
            backgroundColor: [
              '#49b1d6',
              '#47beae',
              '#45cc80',
              '#b6ce6f',
              '#f2cf66',
              '#f4c860',
              '#f7be59',
              '#f9b753',
              '#fbaf4c',
              '#fda645',
              '#ff9f40',
              '#fd8f42',
              '#fb7c44',
              '#f96b46',
              '#f75f48',
              '#f5504a',
              '#f23d4c',
              '#da394a',
              '#c03548',
              '#ab3247',
              '#972f46',
              '#952f46',
              '#5a2642',
              '#4b2036',
              '#3d1a2c',
              '#2f1422',
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  checkboxClick(grade) {
    if (!grade.isChecked) {
      this.gradesSelected = this.gradesSelected.filter(
        (gradeSelected) => gradeSelected !== +grade.val.slice(0, 1)
      );
    } else {
      const copyArray = this.gradesSelected.slice();
      copyArray.push(+grade.val.slice(0, 1));
      this.gradesSelected = copyArray;
    }
  }
}
