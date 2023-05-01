import MainContainer from "./MainContainer";
import { Canvas } from "@react-three/fiber";
// Import three/rapier
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense } from "react";

function App() {
  return (
    <Canvas shadows camera={{ position: [10, 15, 35], fov: 40 }}>
      <Suspense>
        <Physics debug>
          <MainContainer />
        </Physics>
      </Suspense>
    </Canvas>
  );
}

export default App;
