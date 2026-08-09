import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Jupiter() {
  const orbitRef = useRef();
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Jupiter orbits slower than Mars
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.12;
    }

    // Jupiter rotates quickly on its axis
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.018;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[6.5, 0, 0]}>
        <sphereGeometry args={[0.75, 64, 64]} />

        <meshStandardMaterial
          color="#C9A77A"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}