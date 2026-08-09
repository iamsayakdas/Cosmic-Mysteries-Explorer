import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

import PlanetLabel from "./PlanetLabel";
import sunTexture from "../../../assets/textures/sun/sun.jpg";

export default function Sun() {
  const sunRef = useRef();
  const [hovered, setHovered] = useState(false);

  const texture = useTexture(sunTexture);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh
      ref={sunRef}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
    >
      <sphereGeometry args={[1.0, 64, 64]} />

      <meshStandardMaterial
        map={texture}
        color="#ffffff"
        emissiveMap={texture}
        emissive="#ffb300"
        emissiveIntensity={1.5}
        roughness={1}
        metalness={0}
      />

      <PlanetLabel
        name="Sun"
        visible={hovered}
      />
    </mesh>
  );
}