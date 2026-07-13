import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Moon() {
  const moonOrbitRef = useRef();
  const moonRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y = t * 1.5;
    }

    if (moonRef.current) {
      moonRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={moonOrbitRef}>
      <mesh ref={moonRef} position={[0.9, 0, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#CFCFCF" />
      </mesh>
    </group>
  );
}