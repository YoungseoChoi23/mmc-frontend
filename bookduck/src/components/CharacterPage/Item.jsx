import React from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ItemModel = ({ itemType, itemName }) => {
  const gltf = useLoader(
    GLTFLoader,
    `/assets/characterPage/items/${itemType}/${itemName}.glb`
  );

  const itemSettings = {
    HAT: {
      scale: 2.4,
      position: [0, -5.5, 0],
      rotation: [0.1, -0.5, 0],
    },
    PROP: {
      scale: 4.5,
      position: [4.3, -4.0, 0],
      rotation: [0.1, -0.25, 0],
    },
    CLOTHES: {
      scale: 3,
      position: [0, -2, 0],
      rotation: [0.15, -0.2, 0],
    },
    FACE: {
      scale: 3,
      position: [0, -2.5, 0],
      rotation: [0.15, -0.2, 0],
    },
    BAG: {
      scale: 3,
      position: [0, -3.0, 0],
      rotation: [0.15, -0.2, 0],
    },
  };

  const settings = itemSettings[itemType] || itemSettings.PROP;

  return (
    <primitive
      object={gltf.scene}
      scale={settings.scale}
      position={settings.position}
      rotation={settings.rotation}
    />
  );
};

const Item = ({ itemType, itemName }) => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={3.0} color={"#ffe6a6"} />
        <directionalLight position={[0, 5, 5]} intensity={3.0} />
        <ItemModel itemType={itemType} itemName={itemName} />
        <OrbitControls
          enablePan={true}
          enableRotate={false}
          enableZoom={false}
        />
      </Canvas>
    </div>
  );
};
export default Item;
