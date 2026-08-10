import { Canvas } from "@react-three/fiber";

import StarField from "./environment/Stars";
import CameraController from "./controls/CameraController";
import Lights from "./environment/Lights";
import Nebula from "./environment/Nebula";
import OrbitPaths from "./environment/OrbitPaths";

import Sun from "./celestial/Sun";
import Mercury from "./celestial/Mercury";
import Venus from "./celestial/Venus";
import Earth from "./celestial/Earth";
import Mars from "./celestial/Mars";
import Jupiter from "./celestial/Jupiter";
import Saturn from "./celestial/Saturn";
import Uranus from "./celestial/Uranus";
import Neptune from "./celestial/Neptune";

export default function Universe() {
  return (
    <Canvas
      camera={{
        position: [0, 6, 20],
        fov: 55,
      }}
    >
      {/* Background */}
      <color attach="background" args={["black"]} />

      {/* Lighting */}
      <Lights />

      {/* Camera controls */}
      <CameraController />

      {/* Space environment */}
      <StarField />

      <OrbitPaths />

      {/* Celestial bodies */}
      <Sun />

      <Mercury />

      <Venus />

      <Earth />

      <Mars />

      <Jupiter />

      <Saturn />

      <Uranus />

      <Neptune />
    </Canvas>
  );
}