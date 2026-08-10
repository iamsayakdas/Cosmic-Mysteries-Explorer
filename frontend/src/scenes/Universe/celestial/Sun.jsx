import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import PlanetLabel from "./PlanetLabel";
import { usePlanetSelection } from "../PlanetSelectionContext";

import sunTexture from "../../../assets/textures/sun/sun.jpg";

export default function Sun() {
  const sunRef = useRef();
  const glowRef = useRef();

  const [hovered, setHovered] = useState(false);

  const { setSelectedPlanet } = usePlanetSelection();

  const texture = useTexture(sunTexture);

  useFrame(() => {
    // Sun rotation
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }

    // Very slow corona rotation
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group>
      {/* ========================= */}
      {/* SUN SURFACE */}
      {/* ========================= */}

      <mesh
        ref={sunRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedPlanet("Sun");
        }}
      >
        <sphereGeometry args={[1.0, 64, 64]} />

        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          emissiveMap={texture}
          emissive="#ffb300"
          emissiveIntensity={1.5}
          roughness={1}
          metalness={0}
        />

        <PlanetLabel
          name="Sun"
          visible={hovered}
        />
      </mesh>

      {/* ========================= */}
      {/* SOFT SUN CORONA */}
      {/* ========================= */}

      <mesh
        ref={glowRef}
        scale={1.08}
        renderOrder={5}
      >
        <sphereGeometry args={[1.0, 64, 64]} />

        <shaderMaterial
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          uniforms={{
            glowColor: {
              value: new THREE.Color("#ffb347"),
            },
          }}

          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vViewDirection;

            void main() {

              vec4 worldPosition =
                modelMatrix *
                vec4(position, 1.0);

              vec3 worldNormal =
                normalize(
                  mat3(modelMatrix) *
                  normal
                );

              vNormal =
                worldNormal;

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
            uniform vec3 glowColor;

            varying vec3 vNormal;
            varying vec3 vViewDirection;

            void main() {

              float viewDot =
                dot(
                  normalize(vNormal),
                  normalize(vViewDirection)
                );

              float rim =
                1.0 -
                clamp(
                  viewDot,
                  0.0,
                  1.0
                );

              float softGlow =
                pow(
                  rim,
                  3.5
                );

              softGlow =
                smoothstep(
                  0.0,
                  1.0,
                  softGlow
                );

              float intensity =
                softGlow * 0.45;

              gl_FragColor =
                vec4(
                  glowColor,
                  intensity
                );
            }
          `}
        />
      </mesh>
    </group>
  );
}