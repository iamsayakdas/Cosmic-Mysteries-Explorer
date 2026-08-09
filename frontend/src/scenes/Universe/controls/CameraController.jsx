import { OrbitControls } from "@react-three/drei";

export default function CameraController() {
  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.05}
      minDistance={6}
      maxDistance={30}
      target={[0, 0, 0]}
    />
  );
}