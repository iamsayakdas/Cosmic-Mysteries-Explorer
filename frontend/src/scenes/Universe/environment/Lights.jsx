export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />

      <directionalLight
        position={[10, 10, 10]}
        intensity={2}
      />

      <pointLight
        position={[-10, -5, -10]}
        intensity={1}
        color="#66ccff"
      />
    </>
  );
}