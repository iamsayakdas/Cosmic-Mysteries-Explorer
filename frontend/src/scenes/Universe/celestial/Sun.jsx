export default function Sun() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.3, 64, 64]} />

      <meshStandardMaterial
        color="#FDB813"
        emissive="#FF9900"
        emissiveIntensity={3}
      />
    </mesh>
  );
}