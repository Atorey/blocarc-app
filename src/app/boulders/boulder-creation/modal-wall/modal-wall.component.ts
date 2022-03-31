import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-wall',
  templateUrl: './modal-wall.component.html',
  styleUrls: ['./modal-wall.component.scss'],
})
export class ModalWallComponent {
  @Input() wall;

  constructor(public modalCtrl: ModalController) {}

  createWall() {
    this.modalCtrl.dismiss({ changed: true, wall: this.wall });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
