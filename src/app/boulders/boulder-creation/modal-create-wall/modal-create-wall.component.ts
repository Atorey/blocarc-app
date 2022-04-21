import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-create-wall',
  templateUrl: './modal-create-wall.component.html',
  styleUrls: ['./modal-create-wall.component.scss'],
})
export class ModalCreateWallComponent implements OnInit{
  @Input() wall;

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.wall.section = 0;
  }

  createWall() {
    this.modalCtrl.dismiss({ changed: true, wall: this.wall });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
