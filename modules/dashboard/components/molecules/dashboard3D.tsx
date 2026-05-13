import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function FarmIsland() {
  try {
    const { scene } = useGLTF(
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb",
    );
    return <primitive object={scene} scale={1.5} />;
  } catch (error) {
    return (
      <mesh scale={[3, 0.2, 3]}>
        <boxGeometry />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
    );
  }
}

export const Dashboard3D = () => {
  return (
    <div className="relative h-[60vh] w-full bg-[#f4ece1] rounded-3xl overflow-hidden shadow-inner">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} castShadow />
        <Stage environment="city" intensity={0.6}>
          <FarmIsland />
        </Stage>
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>

      <div className="absolute top-6 left-6 bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm border border-white">
        <h2 className="text-2xl font-black text-slate-800">Fruit Garden</h2>
        <p className="text-green-600 font-bold">
          31°C{" "}
          <span className="text-slate-400 font-medium">| 13% Humidity</span>
        </p>
      </div>
    </div>
  );
};
