import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BouldersService } from '../../services/boulders.service';

@Component({
  selector: 'app-modal-create-boulder',
  templateUrl: './modal-create-boulder.component.html',
  styleUrls: ['./modal-create-boulder.component.scss'],
})
export class ModalCreateBoulderComponent implements OnInit {
  @Input() boulder;

  grades = [];
  walls = [];
  constructor(
    public modalCtrl: ModalController,
    private bouldersService: BouldersService
  ) {}

  ngOnInit() {
    this.getGrades();
    this.getWalls();
  }

  createBoulder() {
    this.modalCtrl.dismiss({ changed: true, boulder: this.boulder });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getGrades() {
    this.bouldersService.getGrades().subscribe((grades) => {
      this.grades = grades;
    });
  }

  getWalls() {
    this.bouldersService.getWalls().subscribe((walls) => {
      this.walls = walls;
    });
  }
}
