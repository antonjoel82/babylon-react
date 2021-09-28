import React, { useState } from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, StandardMaterial, Color3, Sound, LinesMesh } from "@babylonjs/core";
import { BabylonScene } from "./babylon/components/BabylonScene";
import { getGlobeCoordinates } from "./babylon/utils";
import { useAudioAnalyser } from "./babylon/hooks";
import { Song } from "./babylon/types";

const MIN_RADIUS = 1;
const MAX_RADIUS = 3;

export const MyViz: React.FC = () => {
  const { analyser } = useAudioAnalyser();
  const [currentSong, setCurrentSong] = useState<Song | undefined>();
  // const [linesMesh, setLinesMesh] = useState<LinesMesh | undefined>();

  const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
    // new Sound(
    //   "funday",
    //   "https://models.babylonjs.com/Demos/musicanalyser/bensound-funday.mp3",
    //   scene,
    //   function () {
    //     setCurrentSong({
    //       // Music: Fun Day from Bensound.com
    //       title: "Fun Day",
    //       artist: "",
    //       link: "www.bensound.com",
    //       ready: true,
    //       audio: this
    //     });
    //     console.log("Song loaded!");

    //     if (currentSong?.audio.isPlaying) {
    //       console.log("Playing song!");
    //       // this.currentSong.audio.play();
    //     }
    //   }
    // );
  
    // const canvas = scene.getEngine().getRenderingCanvas();
  
    // This attaches the camera to the canvas
    // camera.attachControl(canvas, true);
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
  
    //Create lines 
  
    const lineOptions = {
        points: getGlobeCoordinates(MIN_RADIUS, 5),
        updatable: true
    };
    // setLinesMesh(MeshBuilder.CreateLines("lines", lineOptions, scene));
    // const meshClickHandler = new MeshClickHandler(canvas, mesh);
  
    const sphereMaterial = new StandardMaterial("sphereMaterial", scene);
    sphereMaterial.diffuseColor = Color3.Green();
  };
  
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene: Scene) => {
    if (analyser) {
      // if (currentSong?.audio.isPlaying) {
        const frequencies = analyser.getByteFrequencyData();
    //     // console.log("Frequencies: ", frequencies);
        const scaledFreq = frequencies[0] * MAX_RADIUS / analyser.BARGRAPHAMPLITUDE;
        const radius = Math.max(MIN_RADIUS, scaledFreq);
        const scaleFactor = radius / MIN_RADIUS;

        // mesh = MeshBuilder.CreateLines("lines", {
        //     ...lineOptions,
        //     points: getGlobeCoords(radius),
        //     instance: mesh
        // }, scene);
        const scaling = new Vector3(scaleFactor, scaleFactor, scaleFactor);
        // sphere.scaling = new Vector3(scaleFactor, scaleFactor, scaleFactor);
        const colorFreq = (frequencies[7]  / analyser.BARGRAPHAMPLITUDE);

        // console.log(JSON.stringify({
        //     freq: frequencies.subarray(0, 32),
        //     scaledFreq,
        //     scaleFactor,
        //     colorFreq
        // }));
      // setLinesMesh({
      //   ...linesMesh,
      //   color: new Color3(colorFreq, 0, colorFreq),
      //   scaling
      // });
        // sphereMaterial.diffuseColor = new Color3(colorFreq, 0, colorFreq);
    // }
    }

    // GUI
//         const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

//         const button = GUI.Button.CreateSimpleButton("musicToggleBtn", "Toggle Music");
//         button.top = "300px";
//         button.width = 0.2;
//         button.height = "40px";
//         button.color = "white";
//         button.background = "green";

//         button.onPointerClickObservable.add(() => {
//             if (!currentSong.audio.isReady()) {
//                 return;
//             }

//             if (currentSong.audio.isPlaying) {
//                 currentSong.audio.pause();
//             }
//             else if (!currentSong.audio.isPlaying) {
//                 currentSong.audio.play();
//             }
//         })
//         advancedTexture.addControl(button);  
  };

  return (
    <div>
      <BabylonScene
        engineOptions={{
          audioEngine: true
        }}
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="my-canvas"
        width={800}
        height={600}
      />
    </div>
  );
};