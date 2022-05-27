import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { setOptions, localeEs } from '@mobiscroll/angular';
import { TimeInterval } from 'rxjs';
import { Timer } from '../users/interfaces/user';
import { UsersService } from '../users/services/users.service';
/* import { NativeAudio } from '@capacitor-community/native-audio/dist/esm/definitions';
 */ import { NativeAudio } from '@capacitor-community/native-audio';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage {
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

  copyPreparationTime = {
    min: '00',
    sec: '00',
  };
  copyWorkTime = {
    min: '00',
    sec: '00',
  };
  copyRestTime = {
    min: '00',
    sec: '00',
  };
  rounds = '1';

  timer: Timer;

  constructor(
    private pickerController: PickerController,
    private usersService: UsersService
  ) /*     private nativeAudio: NativeAudio
   */ {}

  ionViewWillEnter() {
    this.preloadAudio();
    this.usersService.getTimer().subscribe((timer) => {
      this.preparationTime = {
        min: timer.timer.preparationTime.split(':')[0],
        sec: timer.timer.preparationTime.split(':')[1],
      };
      this.workTime = {
        min: timer.timer.workTime.split(':')[0],
        sec: timer.timer.workTime.split(':')[1],
      };
      this.restTime = {
        min: timer.timer.restTime.split(':')[0],
        sec: timer.timer.restTime.split(':')[1],
      };
      this.rounds = timer.timer.rounds;
    });

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
    const timer = {
      timer: {
        preparationTime:
          this.preparationTime.min + ':' + this.preparationTime.sec,
        workTime: this.workTime.min + ':' + this.workTime.sec,
        restTime: this.restTime.min + ':' + this.restTime.sec,
        rounds: this.rounds,
      },
    };
    this.usersService.postTimer(timer).subscribe();
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
    this.copyPreparationTime = { ...this.preparationTime };
    this.preparationInterval = setInterval(() => {
      if (
        this.copyPreparationTime.min === '00' &&
        this.copyPreparationTime.sec === '00'
      ) {
        clearInterval(this.preparationInterval);
        this.step++;
        this.startWorkTime();
      } else {
        if (+this.copyPreparationTime.sec > 0) {
          const seconds = +this.copyPreparationTime.sec - 1;
          this.copyPreparationTime.sec =
            seconds < 10 ? '0' + seconds : seconds.toString();
        } else {
          const min = +this.copyPreparationTime.min - 1;
          this.copyPreparationTime.min = min < 10 ? '0' + min : min.toString();
          this.copyPreparationTime.sec = '59';
        }

        this.playAudio();
      }
    }, 1000);
  }

  startWorkTime() {
    this.copyWorkTime = { ...this.workTime };
    this.workInterval = setInterval(() => {
      if (this.copyWorkTime.min === '00' && this.copyWorkTime.sec === '00') {
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
        if (+this.copyWorkTime.sec > 0) {
          const seconds = +this.copyWorkTime.sec - 1;
          this.copyWorkTime.sec =
            seconds < 10 ? '0' + seconds : seconds.toString();
        } else {
          const min = +this.copyWorkTime.min - 1;
          this.copyWorkTime.min = min < 10 ? '0' + min : min.toString();
          this.copyWorkTime.sec = '59';
        }
      }
    }, 1000);
  }

  startRestTime() {
    this.copyRestTime = { ...this.restTime };
    this.restInterval = setInterval(() => {
      if (this.copyRestTime.min === '00' && this.copyRestTime.sec === '00') {
        clearInterval(this.restInterval);
        this.currentRound++;
        this.step--;
        this.startWorkTime();
      } else {
        if (+this.copyRestTime.sec > 0) {
          const seconds = +this.copyRestTime.sec - 1;
          this.copyRestTime.sec =
            seconds < 10 ? '0' + seconds : seconds.toString();
        } else {
          const min = +this.copyRestTime.min - 1;
          this.copyRestTime.min = min < 10 ? '0' + min : min.toString();
          this.copyRestTime.sec = '59';
        }
      }
    }, 1000);
  }

  goBack() {
    this.stopInterval();
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

  resetTimer() {
    this.preparationTime = {
      min: '00',
      sec: '00',
    };
    this.workTime = {
      min: '00',
      sec: '00',
    };
    this.restTime = {
      min: '00',
      sec: '00',
    };
    this.rounds = '1';
  }

  preloadAudio() {
    console.log('preload');
    NativeAudio.preload({
      assetId: 'bip',
      assetPath: '../../assets/sounds/bip.mp3',
      audioChannelNum: 1,
      isUrl: false,
    });
  }

  playAudio() {
    NativeAudio.play({
      assetId: 'bip',
      time: 1.0,
    });
  }
}
