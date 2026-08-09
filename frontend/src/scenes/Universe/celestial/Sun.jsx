import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import PlanetLabel from "./PlanetLabel";

export default function Sun() {
  const sunRef = useRef();
  const [hovered, setHovered] = useState(false);

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
      <sphereGeometry args={[1.3, 64, 64]} />

      <meshStandardMaterial
        color="#FDB813"
        emissive="#ffae00"
        emissiveIntensity={4}
      />

      <PlanetLabel
        name="Sun"
        visible={hovered}
      />
    </mesh>
  );
}