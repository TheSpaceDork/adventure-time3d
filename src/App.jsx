import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import './index.css'
import Three from "./component/three/"
import { Html } from '@react-three/drei'
function App() {
  

  return (
    <Canvas id="three-canvas-container" shadows >
      <Suspense fallback={null}>
      <Three/>
      </Suspense>
    </Canvas>
  )
}

export default App
