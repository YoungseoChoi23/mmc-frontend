import React from "react";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { getUserItem } from "../../api/character";

// 기본 오리캐릭터 불러오기
const DuckModel = () => {
  const gltf = useLoader(GLTFLoader, "/assets/characterPage/babyduck.glb");
  return (
    <primitive
      object={gltf.scene}
      scale={1.9}
      position={[0, -2.9, 0]}
      rotation={[0.15, -0.2, 0]}
    />
  );
};

// 아이템 목록 불러오기
const Hat = ({ itemName }) => {
  if (!itemName) return null;
  const gltf = useLoader(
    GLTFLoader,
    // Hat 코드 수정 필요
    // `/assets/characterPage/items/HAT/${itemName}.glb`
    "/assets/characterPage/items/HAT/HAT_03.glb"
  );
  return (
    <primitive
      object={gltf.scene}
      scale={1.9}
      position={[0, -2.85, 0]}
      rotation={[0.15, -0.2, 0]}
    />
  );
};

const Clothes = ({ itemName }) => {
  if (!itemName) return null;
  const gltf = useLoader(
    GLTFLoader,
    `/assets/characterPage/items/CLOTHES/${itemName}.glb`
  );
  return (
    <primitive
      object={gltf.scene}
      scale={1.9}
      position={[0, -2.8, 0.05]}
      rotation={[0.15, -0.2, 0]}
    />
  );
};
const Prop = ({ itemName }) => {
  if (!itemName) return null;
  const gltf = useLoader(
    GLTFLoader,
    `/assets/characterPage/items/PROP/${itemName}.glb`
  );
  return (
    <primitive
      object={gltf.scene}
      scale={1.9}
      position={[0, -2.8, 0]}
      rotation={[0.15, -0.2, 0]}
    />
  );
};
const Face = ({ itemName }) => {
  if (!itemName) return null;
  const gltf = useLoader(
    GLTFLoader,
    `/assets/characterPage/items/FACE/${itemName}.glb`
  );
  return (
    <primitive
      object={gltf.scene}
      scale={1.9}
      position={[0, -2.8, 0]}
      rotation={[0.15, -0.2, 0]}
    />
  );
};

const Bag = ({ itemName }) => {
  if (!itemName) return null;
  const gltf = useLoader(
    GLTFLoader,
    `/assets/characterPage/items/BAG/${itemName}.glb`
  );
  return (
    <primitive
      object={gltf.scene}
      scale={1.9}
      position={[0, -2.8, 0]}
      rotation={[0.15, -0.2, 0]}
    />
  );
};

const UserDuck = ({ userId, selectedItems }) => {
  const [userItemData, setUserItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserItem(userId);
        console.log("아이템 조회성공: ", res);
        setUserItemData(res);
      } catch (err) {
        console.error("오류 발생: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10"></div>;
  }

  // selectedItems가 있으면 그것을 사용하고, 없으면 userItemData의 아이템을 사용
  const itemsToRender = selectedItems
    ? Object.entries(selectedItems).map(([itemType, itemName]) => ({
        itemType,
        itemName,
      }))
    : userItemData?.itemEquipped || [];

  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={3.0} color={"#ffe6a6"} />
        <directionalLight position={[0, 5, 5]} intensity={3.0} />
        <DuckModel />
        {itemsToRender.map((item) => {
          switch (item.itemType) {
            case "HAT":
              return <Hat key="hat" itemName={item.itemName} />;
            case "CLOTHES":
              return <Clothes key="clothes" itemName={item.itemName} />;
            case "PROP":
              return <Prop key="prop" itemName={item.itemName} />;
            case "FACE":
              return <Face key="face" itemName={item.itemName} />;
            case "BAG":
              return <Bag key="bag" itemName={item.itemName} />;
            default:
              return null;
          }
        })}
        <OrbitControls
          enablePan={true}
          enableRotate={true}
          enableZoom={false}
        />
      </Canvas>
    </div>
  );
};

export default UserDuck;
