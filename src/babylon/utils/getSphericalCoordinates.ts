import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { BasicCoordinate2D } from "../types";

export const getSphericalCoordinates = (radius: number, coords: BasicCoordinate2D[]) => {
  const mappedCoords: Vector3[] = [];

  for (var i = 0; i < coords.length; i++) {
      const lat = coords[i].x;
      const lon = coords[i].y;
      const position = new Vector3(0, 0, 0);

      mappedCoords.push(position);
      position.x = Math.cos(lat * Math.PI / 180) * Math.cos(lon * Math.PI / 180) * radius;
      position.y = Math.cos(lat * Math.PI / 180) * Math.sin(lon * Math.PI / 180) * radius;
      position.z = Math.sin(lat * Math.PI / 180) * radius;
  }

  return mappedCoords;
}
