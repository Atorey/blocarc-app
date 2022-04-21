import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Wall } from '../../interfaces/boulder';
import { BouldersService } from '../../services/boulders.service';

@Component({
  selector: 'app-modal-select-wall',
  templateUrl: './modal-select-wall.component.html',
  styleUrls: ['./modal-select-wall.component.scss'],
})
export class ModalSelectWallComponent implements OnInit {
  walls: Wall[] = [];

  constructor(
    public modalCtrl: ModalController,
    private bouldersService: BouldersService
  ) {}

  ngOnInit() {
    this.getWalls();
  }

  getWalls() {
    this.bouldersService.getWalls().subscribe((walls) => {
      this.walls = walls;
    });
  }

  selectWall(selectedWall: Wall) {
    this.modalCtrl.dismiss({ wall: selectedWall });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
