import { useMemo } from "react";
import * as THREE from "three";

const orbits = [
  { radius: 2, color: "#555555" },
  { radius: 3, color: "#555555" },
  { radius: 4, color: "#555555" },
  { radius: 5, color: "#555555" },
  { radius: 6.5, color: "#555555" },
  { radius: 7.5, color: "#555555" },
  { radius: 8, color: "#555555" },
  { radius: 10, color: "#555555" },
];

function Orbit({ radius, color }) {
  const points = useMemo(() => {
    const result = [];

    for (let i = 0; i <= 128; i++) {
      const angle =
        (i / 128) * Math.PI * 2;

      result.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        )
      );
    }

    return result;
  }, [radius]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(
      points
    );
  }, [points]);

  return (
    <lineLoop
      geometry={geometry}
      renderOrder={0}
    >
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.22}
        depthWrite={false}
      />
    </lineLoop>
  );
}

export default function OrbitPaths() {
  return (
    <>
      {orbits.map((orbit) => (
        <Orbit
          key={orbit.radius}
          radius={orbit.radius}
          color={orbit.color}
        />
      ))}
    </>
  );
}