import { Component, Inject, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
  achievement: Achievement = {
    date: new Date().toISOString().substring(0, 10),
    attemps: 1,
    comment: '',
    video: '',
    valoration: 0,
  };
  boulderImage = '';
  holds = [];

  constructor(
    @Inject(BoulderDetailsPage) private parentComponent: BoulderDetailsPage,
    public modalCtrl: ModalController,
    private bouldersService: BouldersService,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.parentComponent.boulder$.subscribe((boulder) => {
      this.boulder = boulder;
      this.boulderImage = 'http://localhost:8080/' + boulder.image;
      this.holds = this.boulder.holds;
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
