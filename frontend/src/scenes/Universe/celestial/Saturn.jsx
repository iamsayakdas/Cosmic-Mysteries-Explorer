import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

import PlanetLabel from "./PlanetLabel";
import saturnTexture from "../../../assets/textures/saturn/saturn.jpg";

export default function Saturn() {
  const orbitRef = useRef();
  const saturnRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(saturnTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Saturn orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.09;
    }

    // Saturn rotation
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[-5.5, 0, 0]}>
        {/* Saturn */}
        <mesh
          ref={saturnRef}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
        >
          <sphereGeometry args={[0.55, 64, 64]} />

          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            roughness={1}
            metalness={0}
          />

          <PlanetLabel
            name="Saturn"
            visible={hovered}
          />
        </mesh>

        {/* Saturn rings */}
        <mesh rotation={[Math.PI / 2.8, 0, 0]}>
          <ringGeometry args={[0.72, 1.25, 96]} />

          <meshStandardMaterial
            color="#C8B28C"
            side={2}
            transparent
            opacity={0.75}
            roughness={1}
          />
        </mesh>
      </group>
    </group>
  );
}