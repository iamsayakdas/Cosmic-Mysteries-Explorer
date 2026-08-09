import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import PlanetLabel from "./PlanetLabel";

export default function Moon() {
  const moonOrbitRef = useRef();
  const moonRef = useRef();

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Moon orbit around Earth
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y = t * 1.5;
    }

    // Moon rotation
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={moonOrbitRef}>
      <mesh
        ref={moonRef}
        position={[0.9, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.12, 32, 32]} />

        <meshStandardMaterial
          color="#B8B8B8"
          roughness={1}
        />

        <PlanetLabel
          name="Moon"
          visible={hovered}
        />
      </mesh>
    </group>
  );
}