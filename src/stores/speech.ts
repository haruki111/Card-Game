import { defineStore } from "pinia";
import { useTableStore } from "./table";
export const useSpeechStore = defineStore({
  id: "speech",
  state: () => ({
    voiceArr: [] as SpeechSynthesisVoice[],
    mc: new SpeechSynthesisUtterance(),
    isGoogle: -1,
  }),
  actions: {
    appendVoices() {
      const voices = speechSynthesis.getVoices();
      voices.forEach((voice) => {
        // 日本語と英語以外の声は選択肢に追加しない。
        if (!voice.lang.match("en-US")) return;
        this.voiceArr.push(voice);
        if (voice.voiceURI.match("Google US English")) {
          this.isGoogle = this.voiceArr.length - 1;
        }
      });
    },

    speech(text: string, index: number) {
      this.mc.text = text;
      let correction = 1;
      if (this.isGoogle != -1) {
        correction = 0;
      } else if (index >= this.isGoogle) {
        correction = 1;
      }

      if (this.voiceArr.length > useTableStore().table.players.length) {
        this.mc.voice = this.voiceArr[index + correction];
      } else {
        this.mc.voice = this.voiceArr[1];
      }

      speechSynthesis.speak(this.mc);
    },

    mcSpeech(text: string) {
      this.mc.text = text;

      if (this.isGoogle != -1) this.mc.voice = this.voiceArr[this.isGoogle];
      else this.mc.voice = this.voiceArr[0];
      speechSynthesis.speak(this.mc);
    },
  },
});
