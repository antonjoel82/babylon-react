import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { getSphericalCoordinates } from "./getSphericalCoordinates";

export const getGlobeCoordinates = (radius: number, stepSize = 1): Vector3[] => {
  const coords = [];
  for (var lat = -90; lat < 90; lat += stepSize) {
    for (var lon = -180; lon < 180; lon += stepSize) {
      coords.push({ x: lat, y: lon });
    }
  }

  return getSphericalCoordinates(radius, coords);
};
