import { useRef } from "react";
import { useState } from "react";

import * as THREE from "three";

// Import three/drei
import {
  OrbitControls,
  Sphere,
  // SpotLight,
  useHelper,
} from "@react-three/drei";

import { Box } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import { Shadow } from "@react-three/drei";


// Import three/rapier
import {  RigidBody, quat } from "@react-three/rapier";

const MainContainer = () => {
  const [hover, setHover] = useState(false);
  const sphere = useRef();
  const kicker = useRef();
  const [start, setStart] = useState(false);

  const jump = () => {
    sphere.current.applyImpulse({ x: 0, y: 50, z: 0 });
    // console.log("jump")
  };

  const directionalLightRef = useRef();
  const directionalLightRefTwo = useRef();
  // const [earthTexture, planetSecondMap] = useTexture(["/8k_earth_dayMap.jpg","/8k_earth_dayMap.jpg"])

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "yellow");
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, "green");

  useFrame((_state, delta) => {
    if(!start) return

    const currentRotation = quat(kicker.current.rotation());
    const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      delta * 1.5
    );
    currentRotation.multiply(incrementRotation);
    kicker.current.setNextKinematicRotation(currentRotation);
  });

  return (
    <>
      <color attach="background" args={["#030103"]} />
      <OrbitControls />
      {/* NOTE: Lighting position x,y,z */}
      <directionalLight
        ref={directionalLightRef}
        position={[0, 5, 15]}
        intensity={1.5}
      />
      {/* <directionalLight
        ref={directionalLightRefTwo}
        position={[0, 10, -20]}
        intensity={0.3}
      /> */}

      <RigidBody
        ref={sphere}
        position={[0, 5, 0]}
        colliders={"ball"}
        restitution={1.6}
        gravityScale={4}
      >
        <Sphere
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={jump} 
        >
        
          <meshStandardMaterial color={hover ? "#0DF205" : "hotpink"} />
        </Sphere>
      </RigidBody>

      {/* KICKER */}
      <RigidBody type="kinematicPosition" position={[0, 0.5, 0]} ref={kicker}>
        <group position={[0, 0, 0]}>
          <Box args={[20, 1, 1]}

          onClick={(() => setStart(true))}
          >
            <meshStandardMaterial color="red" />
          </Box>
        </group>
      </RigidBody>

      {/* GROUND */}

      <RigidBody type="fixed">
        <Box position={[0, 0, 0]} args={[40, 0.1, 40]}
        
        >
          <meshStandardMaterial color="#6379F2" />
        </Box>
      </RigidBody>
    </>
  );
};

export default MainContainer;
