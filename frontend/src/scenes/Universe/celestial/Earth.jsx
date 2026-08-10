import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import PlanetLabel from "./PlanetLabel";
import Moon from "./Moon";

import earthTexture from "../../../assets/textures/earth/earth.jpg";
import cloudTexture from "../../../assets/textures/earth/clouds.jpg";
import nightTexture from "../../../assets/textures/earth/night.jpg";

export default function Earth() {
  const orbitRef = useRef();
  const earthRef = useRef();
  const cloudsRef = useRef();
  const nightRef = useRef();
  const atmosphereRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(earthTexture);
  const cloudTextureMap = useTexture(cloudTexture);
  const nightTextureMap = useTexture(nightTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // =========================
    // EARTH ORBIT
    // =========================

    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.25;
    }

    // =========================
    // EARTH ROTATION
    // =========================

    if (earthRef.current) {
      earthRef.current.rotation.y += 0.02;
    }

    // =========================
    // CLOUD ROTATION
    // =========================

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0205;
    }

    // =========================
    // NIGHT LIGHT ROTATION
    // =========================

    if (nightRef.current) {
      nightRef.current.rotation.y += 0.02;
    }

    // =========================
    // ATMOSPHERE ROTATION
    // =========================

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[4, 0, 0]}>

        {/* ================================= */}
        {/* EARTH SURFACE */}
        {/* ================================= */}

        <mesh
          ref={earthRef}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
        >
          <sphereGeometry args={[0.45, 64, 64]} />

          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            roughness={0.9}
            metalness={0}
          />

          <PlanetLabel
            name="Earth"
            visible={hovered}
          />
        </mesh>

        {/* ================================= */}
        {/* EARTH NIGHT LIGHTS */}
        {/* ================================= */}

        <mesh
          ref={nightRef}
          scale={1.008}
          renderOrder={3}
        >
          <sphereGeometry args={[0.45, 64, 64]} />

          <shaderMaterial
            transparent
            depthWrite={false}
            depthTest={true}
            blending={THREE.NormalBlending}
            uniforms={{
              nightMap: {
                value: nightTextureMap,
              },

              sunPosition: {
                value: new THREE.Vector3(0, 0, 0),
              },
            }}

            vertexShader={`
              varying vec2 vUv;
              varying vec3 vWorldPosition;
              varying vec3 vWorldNormal;

              void main() {
                vUv = uv;

                vec4 worldPosition =
                  modelMatrix * vec4(position, 1.0);

                vWorldPosition =
                  worldPosition.xyz;

                vWorldNormal =
                  normalize(
                    mat3(modelMatrix) * normal
                  );

                gl_Position =
                  projectionMatrix *
                  viewMatrix *
                  worldPosition;
              }
            `}

            fragmentShader={`
              uniform sampler2D nightMap;
              uniform vec3 sunPosition;

              varying vec2 vUv;
              varying vec3 vWorldPosition;
              varying vec3 vWorldNormal;

              void main() {

                // =================================
                // SUN DIRECTION
                // =================================

                vec3 toSun =
                  normalize(
                    sunPosition -
                    vWorldPosition
                  );

                // =================================
                // DAYLIGHT
                // =================================

                float daylight =
                  dot(
                    normalize(vWorldNormal),
                    toSun
                  );

                // =================================
                // NIGHT SIDE
                // =================================

                float nightFactor =
                  smoothstep(
                    0.18,
                    -0.08,
                    daylight
                  );

                // =================================
                // NIGHT MAP
                // =================================

                vec4 nightColor =
                  texture2D(
                    nightMap,
                    vUv
                  );

                // =================================
                // CALCULATE BRIGHTNESS
                // =================================

                float brightness =
                  dot(
                    nightColor.rgb,
                    vec3(
                      0.299,
                      0.587,
                      0.114
                    )
                  );

                // =================================
                // CITY LIGHT DETECTION
                //
                // Higher threshold prevents
                // dark ocean/background pixels
                // from becoming lights.
                // =================================

                float lights =
                  smoothstep(
                    0.10,
                    0.20,
                    brightness
                  );

                // =================================
                // CITY LIGHT INTENSITY
                // =================================

                float intensity =
                  lights *
                  nightFactor *
                  0.75;

                // =================================
                // WARM CITY LIGHT COLOR
                // =================================

                vec3 cityColor =
                  vec3(
                    1.0,
                    0.65,
                    0.25
                  );

                vec3 finalColor =
                  cityColor *
                  intensity;

                // =================================
                // REMOVE INVISIBLE PIXELS
                // =================================

                if (intensity < 0.01) {
                  discard;
                }

                gl_FragColor =
                  vec4(
                    finalColor,
                    intensity
                  );
              }
            `}
          />
        </mesh>

        {/* ================================= */}
        {/* EARTH CLOUDS */}
        {/* ================================= */}

        <mesh
          ref={cloudsRef}
          scale={1.015}
          renderOrder={2}
        >
          <sphereGeometry args={[0.45, 64, 64]} />

          <meshStandardMaterial
            map={cloudTextureMap}
            transparent
            opacity={0.75}
            depthWrite={false}
            roughness={1}
            metalness={0}
          />
        </mesh>

        {/* ================================= */}
        {/* EARTH ATMOSPHERE */}
        {/* ================================= */}

        <mesh
          ref={atmosphereRef}
          scale={1.055}
          renderOrder={4}
        >
          <sphereGeometry args={[0.45, 64, 64]} />

          <shaderMaterial
            transparent
            depthWrite={false}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            uniforms={{
              glowColor: {
                value: new THREE.Color("#3b9cff"),
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
                  pow(
                    1.0 -
                    abs(viewDot),
                    3.0
                  );

                float intensity =
                  rim * 0.55;

                gl_FragColor =
                  vec4(
                    glowColor,
                    intensity
                  );
              }
            `}
          />
        </mesh>

        {/* ================================= */}
        {/* MOON */}
        {/* ================================= */}

        <Moon />

      </group>
    </group>
  );
}