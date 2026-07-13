import { Canvas } from "@react-three/fiber";

export default function Universe() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 60,
      }}
    >
        <color attach="background" args={["black"]} />
    </Canvas>
  );
}