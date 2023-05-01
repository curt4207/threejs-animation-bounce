
import { OrbitControls,
     Sphere,
      // SpotLight,
       useHelper
       } from "@react-three/drei";

  import { useRef } from "react";
  import * as THREE from "three";
  import { useTexture } from "@react-three/drei";
  
  
const MainContainer = () => {
    const directionalLightRef = useRef();
    const directionalLightRefTwo = useRef();
    // const [earthTexture, planetSecondMap] = useTexture(["/8k_earth_dayMap.jpg","/8k_earth_dayMap.jpg"])
   

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "yellow");
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, "green");

  return (
    <>
      <color attach="background" args={["black"]} />
      <OrbitControls />


      {/* NOTE: Lighting position x,y,z */}
      <directionalLight
        ref={directionalLightRef}
        position={[0, 0, 10]}
        intensity={1}
      />
      <directionalLight
        ref={directionalLightRefTwo}
        position={[0, 0, -10]}
        intensity={0.5}
      />

      {/* NOTE: Planet */}
      <mesh
        visible
        userData={{ hello: "world" }} 
      >
        <sphereGeometry args={[1, 34, 34]} />
        <meshStandardMaterial  color="green"
        // map={earthTexture} 
        // normalMap={planetNormalMap}
         />
      </mesh>
      
    </>
  );
};

export default MainContainer;