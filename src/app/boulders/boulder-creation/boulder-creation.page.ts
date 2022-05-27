import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Boulder, Hold, Wall } from '../interfaces/boulder';
import { BouldersService } from '../services/boulders.service';
import { ModalCreateBoulderComponent } from './modal-create-boulder/modal-create-boulder.component';
import { ModalCreateWallComponent } from './modal-create-wall/modal-create-wall.component';
import { ModalSelectWallComponent } from './modal-select-wall/modal-select-wall.component';

@Component({
  selector: 'app-boulder-creation',
  templateUrl: './boulder-creation.page.html',
  styleUrls: ['./boulder-creation.page.scss'],
})
export class BoulderCreationPage implements OnInit {
  @ViewChild('svg') svg;
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
    share: false,
    image: '',
    holds: [],
    valoration: 0,
  };
  holds: string[] = [];

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

    this.imageChangedEvent = photo.dataUrl;
    this.wall.image = photo.dataUrl;
  }

  imageCropped(event: ImageCroppedEvent) {
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
      this.bouldersService.saveWall(this.wall).subscribe({
        next: async (wall) => {
          this.wall = { name: '', section: 0, image: '', coordHolds: '' };
          this.createOption = 'boulder';
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
      this.holds = [];
      this.boulder.holds = [];
      this.selectedWall = result.data.wall;
      console.log(result.data.wall);
      this.toDataURL(
        'https://blocarc-services-production.up.railway.app/' + this.selectedWall.image,
        (dataURL) => {
          this.boulder.image = dataURL;
        }
      );

      this.createHolds();
    } else {
      this.toast.create({
        duration: 3000,
        position: 'bottom',
        message: '¡Error!',
        color: 'error',
      });
    }
  }

  createHolds() {
    const coords = this.selectedWall.coordHolds;

    coords.split('-').forEach((hold) => this.holds.push(hold));
  }

  changeHoldColor(event: any, hold: string) {
    const currentHoldColor = event.srcElement.classList.value;
    const findAndReplaceHold = (color) => {
      const index = this.boulder.holds.findIndex((obj) => obj.coords === hold);
      if (color === '') {
        this.boulder.holds.splice(index, 1);
      } else if (index === -1) {
        this.boulder.holds.push({ coords: hold, color: currentHoldColor });
      } else {
        this.boulder.holds[index].color = color;
      }
    };
    if (currentHoldColor === '') {
      event.srcElement.classList.add('blue');
      this.boulder.holds.push({ coords: hold, color: 'blue' });
    } else if (currentHoldColor === 'blue') {
      event.srcElement.classList.replace('blue', 'green');
      findAndReplaceHold('green');
    } else if (currentHoldColor === 'green') {
      event.srcElement.classList.replace('green', 'red');
      findAndReplaceHold('red');
    } else {
      event.srcElement.classList.remove('red');
      findAndReplaceHold('');
    }
  }

  resetSelectedHolds() {
    this.svg.nativeElement.childNodes.forEach(
      (polygon) => (polygon.classList = [])
    );
    this.boulder.holds = [];
  }

  saveBoulder() {
    this.openCreateBoulderModal();
  }

  async openCreateBoulderModal() {
    const modal = await this.modalCtrl.create({
      component: ModalCreateBoulderComponent,
      componentProps: { boulder: this.boulder },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.boulder) {
      this.bouldersService.saveBoulder(this.boulder).subscribe({
        next: async (boulder) => {
          this.boulder = {
            name: '',
            grade: '',
            wall: '',
            share: false,
            image: '',
            holds: [],
            valoration: 0,
          };
          (
            await this.toast.create({
              duration: 3000,
              position: 'bottom',
              message: '¡Bloque guardado!',
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

  toDataURL(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
