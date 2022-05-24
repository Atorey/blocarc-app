import { Component, Inject, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Achievement, Boulder } from '../../interfaces/boulder';
import { BouldersService } from '../../services/boulders.service';
import { BoulderDetailsPage } from '../boulder-details.page';
import { ModalCompleteBoulderComponent } from '../modal-complete-boulder/modal-complete-boulder.component';

@Component({
  selector: 'app-boulder-view',
  templateUrl: './boulder-view.page.html',
  styleUrls: ['./boulder-view.page.scss'],
})
export class BoulderViewPage implements OnInit {
  boulder: Boulder;
  boulderImage = '';
  holds = [];

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
    private toast: ToastController,
    private alertCrl: AlertController
  ) {}

  ngOnInit() {
    this.parentComponent.boulder$.subscribe((boulder) => {
      this.boulder = boulder;
      this.boulderImage = 'http://localhost:8080/' + boulder.image;
      this.holds = this.boulder.holds;
    });
  }

  async completeBoulder() {
    if (this.boulder.completed) {
      const alert = await this.alertCrl.create({
        header: 'Eliminar bloque completado',
        message:
          '¿Estás seguro de que quieres quitar este bloque de tu lista de completados?',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.bouldersService
                // eslint-disable-next-line @typescript-eslint/dot-notation
                .removeAchievement(this.boulder['_id'])
                .subscribe(() => (this.boulder.completed = false));
            },
          },
          {
            text: 'Cancelar',
            role: 'cancel',
          },
        ],
      });
      alert.present();
    } else {
      this.openCompleteBoulderModal();
    }
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
          next: async () => {
            this.boulder.completed = true;
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

  like() {
    if (this.boulder.like) {
      this.bouldersService
        // eslint-disable-next-line @typescript-eslint/dot-notation
        .removeLike(this.boulder['_id'])
        .subscribe(() => (this.boulder.like = false));
    } else {
      this.bouldersService
        // eslint-disable-next-line @typescript-eslint/dot-notation
        .postLike(this.boulder['_id'])
        .subscribe(() => (this.boulder.like = true));
    }
  }

  save() {
    if (this.boulder.saved) {
      this.bouldersService
        // eslint-disable-next-line @typescript-eslint/dot-notation
        .removeBoulderMark(this.boulder['_id'])
        .subscribe(() => (this.boulder.saved = false));
    } else {
      this.bouldersService
        // eslint-disable-next-line @typescript-eslint/dot-notation
        .postBoulderMark(this.boulder['_id'])
        .subscribe(() => (this.boulder.saved = true));
    }
  }
}
