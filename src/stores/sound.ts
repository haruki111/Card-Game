import { defineStore } from "pinia";
import { Howl } from "howler";
import playCardSound from "@/assets/sound/カードを台の上に出す.mp3";
import turnCardSound from "@/assets/sound/カードをめくる.mp3";
import shuffleCardSound from "@/assets/sound/カードをきる.mp3";
import distributeCardSound from "@/assets/sound/カードを配る.mp3";

export const userSoundStore = defineStore({
  id: "sound",
  state: () => ({
    // bgm: new Howl({
    //   src: [test1],
    //   loop: true,
    //   volume: 0.5,
    //   format: ["mp3"],
    // }),
    playCardSound: new Howl({
      src: [playCardSound],
      volume: 0.3,
      format: ["mp3"],
    }),
    bgmStatus: false as boolean,
    basicVolume: 0.5 as number,
    muteStatus: false as boolean,
  }),

  actions: {
    playCardSound(): void {
      new Howl({
        src: [playCardSound],
        volume: this.basicVolume,
        format: ["mp3"],
        html5: true,
      }).play();
    },
    turnCardSound(): void {
      new Howl({
        src: [turnCardSound],
        volume: this.basicVolume,
        format: ["mp3"],
        html5: true,
      }).play();
    },
    shuffleCardSound(): void {
      new Howl({
        src: [shuffleCardSound],
        volume: this.basicVolume,
        format: ["mp3"],
        html5: true,
      }).play();
    },
    distributeCardSound(): void {
      new Howl({
        src: [distributeCardSound],
        volume: this.basicVolume,
        format: ["mp3"],
        html5: true,
      }).play();
    },
    // onSound(): void {
    //   if (this.bgmStatus) return;
    //   this.bgmStatus = true;
    //   this.bgm.play();
    // },
    // toggleMute(): void {
    //   if (!this.muteStatus) {
    //     this.bgm.mute(true);
    //     this.success.mute(true);
    //     this.miss.mute(true);
    //     this.muteStatus = true;
    //   } else if (this.muteStatus) {
    //     this.bgm.mute(false);
    //     this.success.mute(false);
    //     this.miss.mute(false);
    //     this.muteStatus = false;
    //   }
    // },
    // setVol(value: number): void {
    //   this.bgm.volume(value);
    // },
  },
});
