import React, { createContext, useContext } from'react';
import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Nullable } from '@babylonjs/core/types.js';

export type EngineCanvasContextType = {
  engine: Nullable<Engine>
  canvas: Nullable<HTMLCanvasElement | WebGLRenderingContext>
};

export const EngineCanvasContext = createContext<EngineCanvasContextType>({
  engine: null,
  canvas: null
});

export function withEngineCanvasContext<
  P extends { engineCanvasContext: EngineCanvasContextType },
  R = Omit<P, 'engineCanvasContext'>
  >(
  Component: React.ComponentClass<P> | React.FunctionComponent<P>
  ): React.FunctionComponent<R> {
  return function BoundComponent(props: R) {
    return (
      <EngineCanvasContext.Consumer>
        {ctx => <Component {...props as any} engineCanvasContext={ctx} />}
      </EngineCanvasContext.Consumer>
    );
  };
}
