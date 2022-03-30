import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-boulder-creation',
  templateUrl: './boulder-creation.page.html',
  styleUrls: ['./boulder-creation.page.scss'],
})
export class BoulderCreationPage implements OnInit {
  createOption: String = 'wall';
  wallImage = '';

  constructor(
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
      // allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.wallImage = photo.dataUrl;

    /* this.openAvatarModal(); */
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      quality: 90,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    this.wallImage = photo.dataUrl;

    /* this.openAvatarModal(); */
  }
}
