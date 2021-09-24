import { Engine } from "@babylonjs/core/Engines";
import { Analyser } from "@babylonjs/core/Audio/analyser";
import { useContext, useEffect, useState } from "react";
import { SceneContext } from "../context";

export const DEFAULT_ANALYSER_OPTIONS: AnalyserOptions = {
  fftSize: 32,
  smoothingTimeConstant: 0.5,
  channelCount: 256
};

export const useAudioAnalyser = (
  analyserOptions = DEFAULT_ANALYSER_OPTIONS,
) => {
  const { scene } = useContext(SceneContext);
  const [analyser, setAnalyser] = useState<Analyser | undefined>();

  useEffect(() => {
    if (scene) {
      const tempAnalyzer = new Analyser(scene);
      Engine.audioEngine.connectToAnalyser(tempAnalyzer);

      tempAnalyzer.BARGRAPHAMPLITUDE = analyserOptions.channelCount ?? DEFAULT_ANALYSER_OPTIONS.channelCount!;
      tempAnalyzer.SMOOTHING = analyserOptions.smoothingTimeConstant ?? DEFAULT_ANALYSER_OPTIONS.smoothingTimeConstant!;
      tempAnalyzer.FFT_SIZE = analyserOptions.fftSize ?? DEFAULT_ANALYSER_OPTIONS.fftSize!;

      setAnalyser(tempAnalyzer)
    }

    return () => {
      // TODO: verify that this does what I want it to
      Engine.audioEngine.dispose();
    }
  }, [scene]);

  return {
    analyser,
  };
};
