import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { setOptions, localeEs } from '@mobiscroll/angular';
import { TimeInterval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  step = 0;
  volume = 50;
  numberTime = [];
  numberRounds = [];
  state = 'play';
  currentRound = 1;
  preparationInterval: ReturnType<typeof setInterval>;
  workInterval: ReturnType<typeof setInterval>;
  restInterval: ReturnType<typeof setInterval>;

  preparationTime = {
    min: '00',
    sec: '00',
  };
  workTime = {
    min: '00',
    sec: '00',
  };
  restTime = {
    min: '00',
    sec: '00',
  };

  spreparationTime = {
    min: '00',
    sec: '00',
  };
  sworkTime = {
    min: '00',
    sec: '00',
  };
  srestTime = {
    min: '00',
    sec: '00',
  };

  rounds = '1';

  constructor(private pickerController: PickerController) {}

  ngOnInit() {
    for (let i = 0; i <= 60; i++) {
      this.numberTime.push(i < 10 ? '0' + i.toString() : i.toString());
    }

    for (let i = 1; i <= 99; i++) {
      this.numberRounds.push({ text: i, value: i });
    }
  }

  async preparationTimePicker() {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'Confirmar',
          handler: (selected) => {
            this.preparationTime.min = selected[0].text;
            this.preparationTime.sec = selected[1].text;
          },
        },
      ],
      columns: this.getColumns(60, [this.numberTime, this.numberTime]),
    });
    await picker.present();
  }

  async workTimePicker() {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'Confirmar',
          handler: (selected) => {
            this.workTime.min = selected[0].text;
            this.workTime.sec = selected[1].text;
          },
        },
      ],
      columns: this.getColumns(60, [this.numberTime, this.numberTime]),
    });
    await picker.present();
  }

  async restTimePicker() {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'Confirmar',
          handler: (selected) => {
            this.restTime.min = selected[0].text;
            this.restTime.sec = selected[1].text;
          },
        },
      ],
      columns: this.getColumns(60, [this.numberTime, this.numberTime]),
    });
    await picker.present();
  }

  async roundsPicker() {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'Confirmar',
          handler: (selected) => {
            this.rounds = selected.rounds.value;
          },
        },
      ],
      columns: [
        {
          name: 'rounds',
          options: this.numberRounds,
        },
      ],
    });
    await picker.present();
  }

  getColumns = (numOptions, columnOptions) => {
    const columns = [];
    for (let i = 0; i < 2; i++) {
      columns.push({
        name: `${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions),
      });
    }

    return columns;
  };

  getColumnOptions = (columnIndex, numOptions, columnOptions) => {
    const options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i,
      });
    }

    return options;
  };

  changeIconVolume() {
    if (this.volume === 0) {
      return 'volume-mute';
    } else if (this.volume > 0 && this.volume < 50) {
      return 'volume-low';
    } else if (this.volume >= 50 && this.volume < 100) {
      return 'volume-medium';
    } else if (this.volume === 100) {
      return 'volume-high';
    }
  }

  changeVolume(range) {
    this.volume = range.detail.value;
  }

  startTimer() {
    this.step++;

    if (
      this.preparationTime.min === '00' &&
      this.preparationTime.sec === '00'
    ) {
      this.step++;
      this.startWorkTime();
    } else {
      this.startPreparationTime();
    }
  }

  startPreparationTime() {
    this.spreparationTime = { ...this.preparationTime };
    this.preparationInterval = setInterval(() => {
      if (
        this.spreparationTime.min === '00' &&
        this.spreparationTime.sec === '00'
      ) {
        clearInterval(this.preparationInterval);
        this.step++;
        this.startWorkTime();
      } else {
        if (+this.spreparationTime.sec > 0) {
          const seconds = +this.spreparationTime.sec - 1;
          this.spreparationTime.sec =
            seconds < 10 ? '0' + seconds : seconds.toString();
        } else {
          const min = +this.spreparationTime.min - 1;
          this.spreparationTime.min = min < 10 ? '0' + min : min.toString();
          this.spreparationTime.sec = '59';
        }
      }
    }, 1000);
  }

  startWorkTime() {
    this.sworkTime = { ...this.workTime };
    this.workInterval = setInterval(() => {
      if (this.sworkTime.min === '00' && this.sworkTime.sec === '00') {
        clearInterval(this.workInterval);
        if (this.currentRound === +this.rounds) {
          this.step = 0;
        } else if (this.restTime.min === '00' && this.restTime.sec === '00') {
          this.currentRound++;
          this.startWorkTime();
        } else {
          this.step++;
          this.startRestTime();
        }
      } else {
        if (+this.sworkTime.sec > 0) {
          const seconds = +this.sworkTime.sec - 1;
          this.sworkTime.sec =
            seconds < 10 ? '0' + seconds : seconds.toString();
        } else {
          const min = +this.sworkTime.min - 1;
          this.sworkTime.min = min < 10 ? '0' + min : min.toString();
          this.sworkTime.sec = '59';
        }
      }
    }, 1000);
  }

  startRestTime() {
    this.srestTime = { ...this.restTime };
    this.restInterval = setInterval(() => {
      if (this.srestTime.min === '00' && this.srestTime.sec === '00') {
        clearInterval(this.restInterval);
        this.currentRound++;
        this.step--;
        this.startWorkTime();
      } else {
        if (+this.srestTime.sec > 0) {
          const seconds = +this.srestTime.sec - 1;
          this.srestTime.sec =
            seconds < 10 ? '0' + seconds : seconds.toString();
        } else {
          const min = +this.srestTime.min - 1;
          this.srestTime.min = min < 10 ? '0' + min : min.toString();
          this.srestTime.sec = '59';
        }
      }
    }, 1000);
  }

  goBack() {
    this.step = 0;
  }

  toggleInterval() {
    if (this.state === 'play') {
      this.stopInterval();
      this.state = 'pause';
    } else {
      this.playInterval();
      this.state = 'play';
    }
  }

  stopInterval() {
    if (this.step === 1) {
      clearInterval(this.preparationInterval);
    } else if (this.step === 2) {
      clearInterval(this.workInterval);
    } else {
      clearInterval(this.restInterval);
    }
  }

  playInterval() {
    if (this.step === 1) {
      this.startPreparationTime();
    } else if (this.step === 2) {
      this.startWorkTime();
    } else {
      this.startRestTime();
    }
  }
}
