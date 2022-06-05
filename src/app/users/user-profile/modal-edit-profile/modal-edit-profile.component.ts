import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController, ToastController } from '@ionic/angular';
import { BouldersService } from 'src/app/boulders/services/boulders.service';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss'],
})
export class ModalEditProfileComponent implements OnInit {
  @Input() user: User;
  avatar: string;
  password2 = '';
  email2 = '';
  newAvatar = false;

  constructor(
    public modalCtrl: ModalController,
    private usersService: UsersService,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.user.password = '';
    this.avatar = `${environment.baseUrl_api}/${this.user.avatar}`;
  }

  close() {
    this.modalCtrl.dismiss({ newAvatar: this.newAvatar });
  }

  editInfo() {
    this.usersService
      .editInfoProfile(this.user.username, this.user.email)
      .subscribe(
        async () => {
          (
            await this.toast.create({
              duration: 3000,
              position: 'bottom',
              message: 'Información guardada!',
              color: 'success',
            })
          ).present();
        },
        async (error) => {
          (
            await this.toast.create({
              duration: 3000,
              position: 'bottom',
              message: '¡Error!',
              color: 'error',
            })
          ).present();
        }
      );
  }

  editPassword() {
    this.usersService.editPassword(this.user.password).subscribe(
      async () => {
        (
          await this.toast.create({
            duration: 3000,
            position: 'bottom',
            message: 'Contraseña guardada!',
            color: 'success',
          })
        ).present();
      },
      async (error) => {
        (
          await this.toast.create({
            duration: 3000,
            position: 'bottom',
            message: '¡Error!',
            color: 'error',
          })
        ).present();
      }
    );
  }

  editAvatar() {
    console.log(this.user.avatar);
    this.usersService.editAvatar(this.user.avatar).subscribe(
      async (user) => {
        this.user.avatar = user.avatar;
        (
          await this.toast.create({
            duration: 3000,
            position: 'bottom',
            message: 'Avatar guardado!',
            color: 'success',
          })
        ).present();
      },
      async (error) => {
        (
          await this.toast.create({
            duration: 3000,
            position: 'bottom',
            message: '¡Error!',
            color: 'error',
          })
        ).present();
      }
    );
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.avatar = photo.dataUrl;
    this.user.avatar = this.avatar;
    this.newAvatar = true;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.avatar = photo.dataUrl;
    this.user.avatar = this.avatar;
    this.newAvatar = true;
  }
}
