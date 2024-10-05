/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Map from "../components/MapSection.jsx";
import { useSelector } from "react-redux";

const AnalysisSection = () => {
  const [opacity, setOpacity] = useState(0);
  const state = useSelector((state) => state.scene.active_scene);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }, []);

  return (
    <div
      className={`transition-opacity opacity-${opacity} w-full h-full 
        grid grid-cols-3 grid-rows-2 gap-5 `}
    >
      <div className="box map w-full h-full bg-selection-0 rounded-2xl overflow-hidden xl:col-span-2">
        <Map />
      </div>
      <div className="box w-full h-full bg-selection-0 rounded-2xl overflow-auto xl:row-span-2 pt-4 border border-gray-0/20">
        <header className="px-4">
          <div className="flex justify-between items-center">
            <h2 className="font-orbit tracking-wider font-semibold">
              Scene Analysis
            </h2>
          </div>
          {/* <Chart /> */}
        </header>
        <div className="w-full h-0.5 bg-gray-0/20 mt-4"></div>
      </div>
      <div className="box w-full h-full bg-selection-0 rounded-2xl overflow-auto xl:col-span-2">
        Metadata
      </div>
    </div>
  );
};

export default AnalysisSection;
