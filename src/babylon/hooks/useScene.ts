import { Nullable, Engine, Scene } from "@babylonjs/core";
import { useRef, useState, useEffect } from "react";
import { BabylonSceneProps } from "../components";
import { SceneContextType, EngineCanvasContextType } from "../context";

export const useScene = (props: BabylonSceneProps) => {
  const sceneCanvas = useRef<Nullable<HTMLCanvasElement>>(null);
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, renderChildrenWhenReady } = props;

  const [sceneContext, setSceneContext] = useState<SceneContextType>({
    scene: null,
    sceneReady: false
  });

  const [engineContext, setEngineContext] = useState<EngineCanvasContextType>({
    engine: null,
    canvas: null
  });

  useEffect(() => {
    if (sceneCanvas.current) {
      const engine = new Engine(sceneCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      setEngineContext(() => ({
        engine,
        canvas: sceneCanvas.current
      }));

      const scene = new Scene(engine, sceneOptions);
      const sceneIsReady = scene.isReady();
      if (sceneIsReady) {
        onSceneReady?.(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => {
          onSceneReady?.(scene);
          setSceneContext(() => ({
            canvas: sceneCanvas.current,
            scene,
            engine,
            sceneReady: true,
          }));
        });
      }

      engine.runRenderLoop(() => {
        if (scene.activeCamera) {
          if (typeof onRender === 'function') {
            onRender(scene);
          }
          scene.render();
        } else {
          // @babylonjs/core throws an error if you attempt to render with no active camera.
          // if we attach as a child React component we have frames with no active camera.
          console.warn('no active camera..');
        }
      })

      const resize = () => {
        scene.getEngine().resize();
      }

      if (window) {
        window.addEventListener('resize', resize);
      }

      setSceneContext(() => ({
        canvas: sceneCanvas.current,
        scene,
        engine,
        sceneReady: sceneIsReady,
      }));

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener('resize', resize);
        }
      }
    }
  }, [sceneCanvas]);

  return {
    sceneCanvas,
    sceneContext,
    engineContext
  };
};
