import { Canvas } from "@react-three/fiber";

import StarField from "./environment/Stars";
import CameraController from "./controls/CameraController";
import Lights from "./environment/Lights";

import Sun from "./celestial/Sun";
import Earth from "./celestial/Earth";
import Saturn from "./celestial/Saturn";

export default function Universe() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 60,
      }}
    >
      <color attach="background" args={["black"]} />

      <Lights />

      <CameraController />

      <StarField />

      <Sun />

      <Earth />

      <Saturn />
    </Canvas>
  );
}