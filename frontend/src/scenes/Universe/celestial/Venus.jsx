import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import PlanetLabel from "./PlanetLabel";

export default function Venus() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.32;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={planetRef}
        position={[3, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.3, 48, 48]} />

        <meshStandardMaterial
          color="#D9B27C"
          roughness={0.9}
        />

        <PlanetLabel
          name="Venus"
          visible={hovered}
        />
      </mesh>
    </group>
  );
}