import { createContext, useContext } from 'react';
import { Scene } from '@babylonjs/core/scene.js';
import { Nullable } from '@babylonjs/core/types.js';

export type SceneContextType = {
    scene: Nullable<Scene>
    sceneReady: boolean
};

export const SceneContext = createContext<SceneContextType>({
    scene: null,
    sceneReady: false
});
