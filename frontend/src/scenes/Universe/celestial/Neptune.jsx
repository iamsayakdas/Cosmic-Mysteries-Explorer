import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import PlanetLabel from "./PlanetLabel";
import neptuneTexture from "../../../assets/textures/neptune/neptune.jpg";

export default function Neptune() {
  const orbitRef = useRef();
  const planetRef = useRef();
  const atmosphereRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(neptuneTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Neptune orbit around the Sun
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.035;
    }

    // Neptune rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
    }

    // Very slow atmospheric movement
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[10, 0, 0]}>

        {/* ========================= */}
        {/* NEPTUNE */}
        {/* ========================= */}

        <mesh
          ref={planetRef}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
        >
          <sphereGeometry args={[0.40, 64, 64]} />

          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            roughness={1}
            metalness={0}
          />

          <PlanetLabel
            name="Neptune"
            visible={hovered}
          />
        </mesh>

        {/* ========================= */}
        {/* NEPTUNE ATMOSPHERE */}
        {/* ========================= */}

        <mesh
          ref={atmosphereRef}
          scale={1.025}
          renderOrder={4}
        >
          <sphereGeometry args={[0.40, 64, 64]} />

          <shaderMaterial
            transparent
            depthWrite={false}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            uniforms={{
              atmosphereColor: {
                value: new THREE.Color("#4f8cff"),
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
                    3.5
                  );

                float intensity =
                  rim * 0.20;

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
    </group>
  );
}