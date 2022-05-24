import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BouldersService } from '../../services/boulders.service';

@Component({
  selector: 'app-modal-update-boulder',
  templateUrl: './modal-update-boulder.component.html',
  styleUrls: ['./modal-update-boulder.component.scss'],
})
export class ModalUpdateBoulderComponent implements OnInit {
  @Input() boulder;

  grades = [];
  constructor(
    public modalCtrl: ModalController,
    private bouldersService: BouldersService
  ) {}

  ngOnInit() {
    this.getGrades();
  }

  updateBoulder() {
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
}
