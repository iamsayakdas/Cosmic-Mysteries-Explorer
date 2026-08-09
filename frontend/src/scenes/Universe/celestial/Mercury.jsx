import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Mercury() {
  const orbitRef = useRef();
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.45;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[2, 0, 0]}>
        <sphereGeometry args={[0.16, 32, 32]} />

        <meshStandardMaterial
          color="#8C8983"
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}