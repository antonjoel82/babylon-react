import { ISoundOptions } from "@babylonjs/core/Audio/Interfaces/ISoundOptions";
import { Sound } from "@babylonjs/core/Audio/sound";


export interface SongInfo {
  title: string;
  link: string;
  artist?: string;
}

export interface LoadableSongInfo extends SongInfo {
  audioOptions?: ISoundOptions;
}

export interface Song extends SongInfo {
  audio: Sound;
}
