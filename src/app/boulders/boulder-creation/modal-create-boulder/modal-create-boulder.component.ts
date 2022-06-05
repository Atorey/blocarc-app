import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
    private bouldersService: BouldersService,
    private alertCrl: AlertController
  ) {}

  ngOnInit() {
    this.getGrades();
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

  async alert() {
    const alert = await this.alertCrl.create({
      header: 'Compartir bloque',
      message: 'Si dicides compartir este bloque no podrás eliminarlo. La acción de compartir es irrevocable.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.boulder.share = true;
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.boulder.share = false;
          },
        },
      ],
    });
    alert.present();
  }
}
