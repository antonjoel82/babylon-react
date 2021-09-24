import { EngineOptions, Scene, SceneOptions } from "@babylonjs/core";
import React from "react";
import { EngineCanvasContext, SceneContext } from "../context";
import { useScene } from "../hooks/useScene";

export interface BabylonSceneProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  onRender?: (scene: Scene) => void;
  onSceneReady?: (scene: Scene) => void;
}

export const BabylonScene: React.FC<BabylonSceneProps> = (props) => {
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    renderChildrenWhenReady,
    children,
    ...rest
  } = props;

  const { sceneCanvas, engineContext, sceneContext } = useScene(props);

  return (
    <>
      <canvas ref={sceneCanvas} {...rest} />
      <EngineCanvasContext.Provider value={engineContext}>
        <SceneContext.Provider value={sceneContext}>
          {(renderChildrenWhenReady !== true ||
            (renderChildrenWhenReady === true && sceneContext.sceneReady)) &&
            children}
        </SceneContext.Provider>
      </EngineCanvasContext.Provider>
    </>
  );
};
