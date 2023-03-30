import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { angleToRadians } from '../../utils/angle'
import * as THREE from "three"
import gsap from 'gsap'
import Finn from './Finn'
import Jake from './Jake'
import Pb from './Pb'
export default  function index  () {

  // code to move the camera around
const orbitControlsRef = useRef(null)
useFrame((state) => {
if (!!orbitControlsRef.current) {
  const { x, y } = state.mouse

  orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(150))
  orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30))
  orbitControlsRef.current.update()
    }
  })

// Animation
  const ballRef = useRef(null)
  useEffect(() => {
    if (!!ballRef.current) {
  //  x-axis motion 
      gsap.to(ballRef.current.position, {
        x: 2,
        duration: 5,
        ease: "power3.out",
        delay: 1,
      })
      // y-axis bounce 
      gsap.from(ballRef.current.position, {
        y: 9,
        duration: 3,
        ease: "bounce.out"
      }
        )
 }
  }, [ballRef.current])
  return (
      <>
     <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={ angleToRadians(85)} />

      {/* Ball */}
      <mesh ref={ballRef} position={[-2, 0.8, 0, 0]} castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.1} />
      </mesh>
      {/* Finn the human */}
      <Finn />
      {/* jake the dog */}
      <Jake />
      {/* obah san pb */}
      <Pb/>
      {/* Floor */}
      <mesh rotation={[ -(angleToRadians(90)), 0 , 0] } receiveShadow>
        <planeGeometry args={[20, 20]}  />
        <meshStandardMaterial color="#1ea3d8"  />
      </mesh>
 {/* ambient light */}
      <ambientLight args={['#ffffff', 0.15]} />
      {/* spotlight light */}
      <spotLight args={["#ffffff", 4, 15, angleToRadians(45), 0.4]} position={[0, 1, 6]} castShadow />
      
      {/*Environment  */}
      <Environment background >
        <mesh>
           <sphereGeometry args={[50, 100, 100]} />
           <meshBasicMaterial side={THREE.BackSide} color="#2280cc"/>
        </mesh>
       </Environment>
      </>
  ) 
}

