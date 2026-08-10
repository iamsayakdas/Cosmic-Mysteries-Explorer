export default function Lights() {
  return (
    <>
      {/* Main sunlight coming from the Sun */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2.2}
        color="#ffffff"
        distance={100}
        decay={0}
      />
    </>
  );
}