import { Sound } from "@babylonjs/core/Audio/sound";

export interface Song {
  title: string;
  artist: string;
  link: string;
  ready: boolean;
  audio: Sound;
}
