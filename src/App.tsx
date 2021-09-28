import React from 'react'
// import { EngineCanvasContext } from 'react-babylonjs/dist/hooks/engine';
// import { SceneContext, useScene } from 'react-babylonjs/dist/hooks/scene';
import { DynamicTerrain } from './DynamicTerrain'
import SampleBabylon from './SampleBabylon'
import "@babylonjs/loaders/glTF";
import { ModelApp } from './ModelApp';

function App() {
  // const scene = useScene();

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase">
            Welcome to
          </h2>
          <ModelApp />
          {/* <EngineCanvasContext.Provider value={engineContext}>
            <SceneContext.Provider value={sceneContext}> */}
              {/* <DynamicTerrain
                xSize={500}
                zSize={500}
                subSize={100}
                heightScalar={5}
              /> */}

            {/* </SceneContext.Provider>
          </EngineCanvasContext.Provider> */}
        </div>
      </div>
    </div>
  );
}

export default App
