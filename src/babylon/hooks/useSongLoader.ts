import { ISoundOptions, Nullable, Scene, Sound } from "@babylonjs/core";
import { useEffect, useState } from "react";
import { LoadableSongInfo, Song, SongInfo } from "../types";

export interface SongLoaderProps {
  scene: Nullable<Scene>;
}

export const useSongLoader = ({ scene }: SongLoaderProps) => {
  const [songs, setSongs] = useState<Record<string, Song>>({});
  const [readySongs, setReadySongs] = useState<Set<string>>(new Set([]));
  const [songsToLoad, setSongsToLoad] = useState<LoadableSongInfo[]>([]);

  const handleSongReady = (songInfo: SongInfo) => () => {
    console.log("handleSongReady: ", JSON.stringify(songInfo, null, 2));

    setReadySongs((loadedSongs) => new Set([
      ...loadedSongs,
      songInfo.link
    ]));
  };

  const loadSong = (songInfo: LoadableSongInfo, audioOptions?: ISoundOptions) => {
    console.log("Loading song: ", JSON.stringify(songInfo, null, 2));
    if (!scene) {
      console.warn("Attempting to register a song before the scene is loaded");
      return;
    }

    setSongs((existingSongs) => {
      return {
        ...existingSongs,
        [songInfo.link]: {
          ...songInfo,
          audio: new Sound(songInfo.title, songInfo.link, scene, handleSongReady(songInfo), audioOptions)
        }
      };
    });
    
    const songToLoadIndex = songsToLoad.findIndex(({ link }) => songInfo.link === link);
    if (songToLoadIndex >= 0) {
      setSongsToLoad((queuedSongs) => queuedSongs.splice(songToLoadIndex, 1));
    }
  };

  const loadSongs = () => {
    songsToLoad.forEach(({ audioOptions, ...songInfo }) => loadSong(songInfo, audioOptions));
  };

  const addSongs = (songInfos: SongInfo[], audioOptions?: ISoundOptions) => {
    setSongsToLoad((queuedSongs) => queuedSongs.concat(...songInfos.map((info) => ({ ...info, audioOptions }))));
  };

  // useEffect(() => {
  //   console.log("useSongLoader useEffect", songsToLoad);
  //   if (scene && songsToLoad.length > 0) {
  //     loadSongs();
  //   }
  // }, [scene, songsToLoad]);

  const isSongReady = (songUrl: string) => readySongs.has(songUrl);

  return {
    addSongs,
    songs,
    readySongs,
    isSongReady
  };
};
