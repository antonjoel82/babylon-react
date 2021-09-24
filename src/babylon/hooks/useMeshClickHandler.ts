// import { Mesh } from "@babylonjs/core/Meshes/mesh";
// import { useEffect, useState } from "react";
import { BasicCoordinate2D } from "../types";

export interface MeshClickHandlerProps {
  canvas: HTMLCanvasElement;
  startingPosition?: BasicCoordinate2D;
  startingRotation?: BasicCoordinate2D;
}

export const useMeshClickHandler = ({
  // canvas,
  // startingPosition = { x: 0, y: 0 },
  // startingRotation = { x: 0, y: 0 }
}: MeshClickHandlerProps) => {

  // TODO will likely have to use refs here and figure out the lifecycle.
  
  // const [mesh, setMesh] = useState<Mesh | undefined>();
  // const [clicked, setClicked] = useState<boolean>(false);
  // const [currentPosition, setCurrentPosition] = useState<BasicCoordinate2D>(startingPosition);
  // const [currentRotation, setCurrentRotation] = useState<BasicCoordinate2D>(startingRotation);

  // const handlePointerDown = (event: PointerEvent) => {
  //   setCurrentPosition({ x: event.clientX, y: event.clientY });
  //   setCurrentRotation({ x: mesh.rotation.x, y: mesh.rotation.y });
  //   setClicked(true);
  // };

  // const handlePointerMove = (event: PointerEvent) => {
  //   if (clicked) {
  //     return;
  //   }
  //   mesh.rotation.y = currentRotation.y - (event.clientX - currentPosition.x) / 100.0;
  //   mesh.rotation.x = currentRotation.x + (event.clientY - currentPosition.y) / 100.0;
  // };

  // const handlePointerUp = (event: PointerEvent) => {
  //   setClicked(false);
  // };


  // const init = () => {
  //   setClicked(false);

  //   canvas.addEventListener("pointerdown", handlePointerDown);
  //   canvas.addEventListener("pointermove", handlePointerMove);
  //   canvas.addEventListener("pointerup", handlePointerUp);
  // };

  // const destroy = () => {
  //   canvas.removeEventListener("pointerdown", handlePointerDown);
  //   canvas.removeEventListener("pointermove", handlePointerMove);
  //   canvas.removeEventListener("pointerup", handlePointerUp);
  // };

  // useEffect(() => {
  //   init();

  //   return destroy;
  // }, [canvas, mesh])

  return {
    // destroy
  };
};
