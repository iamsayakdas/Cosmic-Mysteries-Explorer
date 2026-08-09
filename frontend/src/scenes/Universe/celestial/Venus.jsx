import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Venus() {
  const orbitRef = useRef();
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Venus orbits slower than Mercury
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.32;
    }

    // Venus rotates on its axis
    if (planetRef.current) {
      planetRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[3, 0, 0]}>
        <sphereGeometry args={[0.3, 48, 48]} />

        <meshStandardMaterial
          color="#D9B27C"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}