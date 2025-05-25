import React from "react";
import { useState, useEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';

const Model: React.FC = () => {
    const [targetPos, setTargetPos] = useState([0, 0]);

    const { scene } = useGLTF("/smile.gltf");

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.color.set('rgb(0, 138, 255)');
            }
        });
    }, [scene]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent): void => {
            // scene.rotation.x = (event.clientY - window.innerHeight/2) / 1000;
            // scene.rotation.y = (event.clientX - window.innerWidth/2) / 1000;
            setTargetPos([(event.clientY - window.innerHeight/2) / 800, (event.clientX - window.innerWidth/2) / 1200]);
        };

        window.addEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((_0, _1) => {
        scene.rotation.x = (scene.rotation.x * 11 + targetPos[0]) / 12;
        scene.rotation.y = (scene.rotation.y * 11 + targetPos[1]) / 12;
    });

    return (
        <primitive object={scene} scale={0.1} position={[0, -1, 0]}/>
    );
};

const Smile: React.FC = () => {
    
    return (
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 80], fov: 50 }}>
            <ambientLight intensity={2} />
            <Model />
        </Canvas>
    );
};

export default Smile;