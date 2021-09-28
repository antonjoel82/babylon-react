
import React, { useContext } from 'react'
import { Engine, Scene, SceneContext } from 'react-babylonjs';
import { Vector3, Color3, Color4 } from '@babylonjs/core/Maths/math'
import './terrain.css'
import { useSongLoader } from './babylon/hooks/useSongLoader';

interface DynamicTerrainProps {
  xSize: number;
  zSize: number;
  subSize: number;
  heightScalar?: number;
}

const getMapData = (xSize: number, zSize: number, heightScalar = 2.0) => {
  let mapSubX = xSize;
  let mapSubZ = zSize;

  // map creation
  const mapData = new Float32Array(mapSubX * mapSubZ * 3);
  for (let l = 0; l < mapSubZ; l++) {
    for (let w = 0; w < mapSubX; w++) {
      const index = 3 * (l * mapSubX + w);
      mapData[index] = (w - mapSubX * 0.5) * 2.0;
      mapData[index + 1] = (w / (l + 1)) * Math.sin((l + 1) / 2) * Math.cos(w / 2) * heightScalar;
      mapData[index + 2] = (l - mapSubZ * 0.5) * 2.0;
    }
  }
  return mapData;
};

export const DynamicTerrain: React.FC<DynamicTerrainProps> = ({ xSize, zSize, subSize, heightScalar }) => {
  const mapData = getMapData(xSize, zSize, heightScalar);
  const { scene } = useContext(SceneContext);

  // const { addSongs } = useSongLoader({ scene });

  // addSongs([{
  //   title: "Fun Day",
  //   link: "https://models.babylonjs.com/Demos/musicanalyser/bensound-funday.mp3"
  // }], { autoplay: true });

  return (
    <Engine antialias adaptToDeviceRatio canvasId='babylonJS'>
      <Scene clearColor={new Color4(0.2, 0.4, 0.75, 1.0)}>
        <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
        <freeCamera name='camera1' position={new Vector3(-50, 10, 0)} setTarget={[new Vector3(-20, 0, 0)]} />
        <dynamicTerrain name='ContinuousTerrain' mapData={mapData} mapSubX={xSize} mapSubZ={zSize} terrainSub={subSize}>
          <standardMaterial name='terrain-material' diffuseColor={Color3.Green()} assignTo='mesh.material' wireframe={true} />
        </dynamicTerrain>
      </Scene>
    </Engine>
  );
};
