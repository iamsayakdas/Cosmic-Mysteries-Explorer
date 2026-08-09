import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Sun() {
  const sunRef = useRef();

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[1.3, 64, 64]} />
      <meshStandardMaterial
        color="#FDB813"
        emissive="#ffae00"
        emissiveIntensity={4}
      />
    </mesh>
  );
}