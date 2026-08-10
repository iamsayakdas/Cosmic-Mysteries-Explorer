import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import PlanetLabel from "./PlanetLabel";
import venusTexture from "../../../assets/textures/venus/venus.jpg";

export default function Venus() {
  const orbitRef = useRef();
  const planetRef = useRef();
  const atmosphereRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(venusTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Venus orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.32;
    }

    // Venus rotates slowly in the opposite direction
    if (planetRef.current) {
      planetRef.current.rotation.y -= 0.003;
    }

    // Very slow atmospheric movement
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.0005;
    }
  });

  return (
    <group ref={orbitRef}>

      {/* ========================= */}
      {/* VENUS SURFACE */}
      {/* ========================= */}

      <mesh
        ref={planetRef}
        position={[3, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.3, 64, 64]} />

        <meshStandardMaterial
          map={texture}
          bumpMap={texture}
          bumpScale={0.012}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />

        <PlanetLabel
          name="Venus"
          visible={hovered}
        />
      </mesh>

      {/* ========================= */}
      {/* VENUS ATMOSPHERE */}
      {/* ========================= */}

      <mesh
        ref={atmosphereRef}
        position={[3, 0, 0]}
        scale={1.025}
        renderOrder={4}
      >
        <sphereGeometry args={[0.3, 64, 64]} />

        <shaderMaterial
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          uniforms={{
            atmosphereColor: {
              value: new THREE.Color("#f0b36a"),
            },
          }}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vViewDirection;

            void main() {
              vec4 worldPosition =
                modelMatrix *
                vec4(position, 1.0);

              vNormal =
                normalize(
                  mat3(modelMatrix) *
                  normal
                );

              vViewDirection =
                normalize(
                  cameraPosition -
                  worldPosition.xyz
                );

              gl_Position =
                projectionMatrix *
                viewMatrix *
                worldPosition;
            }
          `}
          fragmentShader={`
            uniform vec3 atmosphereColor;

            varying vec3 vNormal;
            varying vec3 vViewDirection;

            void main() {

              float viewDot =
                dot(
                  normalize(vNormal),
                  normalize(vViewDirection)
                );

              float rim =
                pow(
                  1.0 -
                  abs(viewDot),
                  3.0
                );

              float intensity =
                rim * 0.22;

              gl_FragColor =
                vec4(
                  atmosphereColor,
                  intensity
                );
            }
          `}
        />
      </mesh>

    </group>
  );
}