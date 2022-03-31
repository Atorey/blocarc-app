import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { Wall } from '../interfaces/boulder';
import { BouldersService } from '../services/boulders.service';
import { ModalWallComponent } from './modal-wall/modal-wall.component';

@Component({
  selector: 'app-boulder-creation',
  templateUrl: './boulder-creation.page.html',
  styleUrls: ['./boulder-creation.page.scss'],
})
export class BoulderCreationPage implements OnInit {
  createOption: String = 'wall';
  wall: Wall = {
    name: '',
    sections: 0,
    image: '',
    coordHolds: '',
  };

  constructor(
    private bouldersService: BouldersService,
    public modalCtrl: ModalController,
    private toast: ToastController
  ) {}

  ngOnInit() {}

  changeValue(value: String): void {
    this.createOption = value;
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      resultType: CameraResultType.DataUrl,
    });

    this.wall.image = photo.dataUrl;
    this.saveCoords(this.wall.image.slice(23));
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      quality: 90,
      resultType: CameraResultType.DataUrl,
    });

    this.wall.image = photo.dataUrl;
    this.saveCoords(this.wall.image.slice(23));
  }

  saveCoords(imageBase64: string) {
    this.bouldersService
      .getCoords({ image: imageBase64 })
      .subscribe((result) => (this.wall.coordHolds = result));
  }

  saveWall() {
    this.openAvatarModal();
  }

  async openAvatarModal() {
    const modal = await this.modalCtrl.create({
      component: ModalWallComponent,
      componentProps: { wall: this.wall },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.wall) {
      this.bouldersService.saveWall(this.wall).subscribe(async (wall) => {
        this.wall = { name: '', sections: 0, image: '', coordHolds: '' };
        (
          await this.toast.create({
            duration: 3000,
            position: 'bottom',
            message: 'Pared guardada!',
            color: 'success',
          })
        ).present();
      });
    } else {
      this.toast.create({
        duration: 3000,
        position: 'bottom',
        message: '¡Error!',
        color: 'error',
      });
    }
  }
}
