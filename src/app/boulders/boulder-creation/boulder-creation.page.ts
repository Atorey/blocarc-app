import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Boulder, Wall } from '../interfaces/boulder';
import { BouldersService } from '../services/boulders.service';
import { ModalCreateWallComponent } from './modal-create-wall/modal-create-wall.component';
import { ModalSelectWallComponent } from './modal-select-wall/modal-select-wall.component';

@Component({
  selector: 'app-boulder-creation',
  templateUrl: './boulder-creation.page.html',
  styleUrls: ['./boulder-creation.page.scss'],
})
export class BoulderCreationPage implements OnInit {
  createOption = 'wall';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  selectedWall: Wall;
  wall: Wall = {
    name: '',
    section: 0,
    image: '',
    coordHolds: '',
  };
  boulder: Boulder = {
    name: '',
    grade: '',
    wall: '',
    section: '',
    share: false,
    image: '',
    coordHolds: '',
  };

  constructor(
    private bouldersService: BouldersService,
    public modalCtrl: ModalController,
    private toast: ToastController
  ) {}

  ngOnInit() {}

  changeValue(value: string): void {
    this.createOption = value;
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      resultType: CameraResultType.DataUrl,
    });

    this.imageChangedEvent = photo.dataUrl;
    this.wall.image = photo.dataUrl;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      quality: 90,
      resultType: CameraResultType.DataUrl,
    });

    console.log(photo.dataUrl);
    this.imageChangedEvent = photo.dataUrl;
    this.wall.image = photo.dataUrl;
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log(event.base64);
    this.wall.image = event.base64;
}

  saveCoords(imageBase64: string) {
    this.bouldersService
      .getCoords({ image: imageBase64 })
      .subscribe((result) => (this.wall.coordHolds = result));
  }

  saveWall() {
    this.openCreateWallModal();
  }

  async openCreateWallModal() {
    this.saveCoords(this.wall.image.slice(22));
    const modal = await this.modalCtrl.create({
      component: ModalCreateWallComponent,
      componentProps: { wall: this.wall },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.wall) {
      this.bouldersService.saveWall(this.wall).subscribe(async (wall) => {
        this.wall = { name: '', section: 0, image: '', coordHolds: '' };
        this.createOption = 'boulder';
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

  selectWall() {
    this.openSelectWallModal();
  }

  async openSelectWallModal() {
    const modal = await this.modalCtrl.create({
      component: ModalSelectWallComponent,
      componentProps: { wall: this.wall },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.wall) {
      this.selectedWall = result.data.wall;
      console.log(result.data.wall);
      /* this.bouldersService.saveWall(this.wall).subscribe(async (wall) => {
        this.wall = { name: '', section: 0, image: '', coordHolds: '' };
        this.createOption = 'boulder';
        (
          await this.toast.create({
            duration: 3000,
            position: 'middle',
            message: 'Pared guardada!',
            color: 'success',
          })
        ).present();
      }); */
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
