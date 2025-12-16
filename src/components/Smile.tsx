import React from "react";
import { useState, useEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from '../utils/three-exports.ts';

type ModelProps = {
    scene: THREE.Group
}

const Model: React.FC<ModelProps> = ({ scene }) => {
    const [targetPos, setTargetPos] = useState([0, 0]);

    const isMesh = (object: THREE.Object3D): object is THREE.Mesh => {
        return object.type == "Mesh";
    }

    useEffect(() => {
        scene.traverse((child) => {
            if(isMesh(child)){
                const mat = child.material as THREE.MeshStandardMaterial;
                mat.color.set('rgb(0, 138, 255)');
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
        scene.rotation.x = (scene.rotation.x * 0 + targetPos[0]) / 1;
        scene.rotation.y = (scene.rotation.y * 0 + targetPos[1]) / 1;
    });

    return (
        <primitive object={scene} scale={0.1} position={[0, -1, 0]}/>
    );
};

const Smile: React.FC = () => {
    const { scene } = useGLTF("/smile.gltf");
    const clonedScene = scene.clone();
    return (
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 80], fov: 50 }}>
            <ambientLight intensity={2} />
            <Model scene={clonedScene} />
        </Canvas>
    );
};

export default Smile;