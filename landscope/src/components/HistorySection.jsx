import { useEffect, useState } from "react";
import Map from "../components/MapSection.jsx";
import HistoryList from "./HistoryList.jsx";

const HistorySection = () => {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }, []);

  return (
    <div
      className={`transition-opacity opacity-${opacity} w-full h-full flex items-start justify-evenly gap-4 md:flex-col lg:flex-row `}
    >
      <div className="box map w-full h-full bg-selection-0 rounded-2xl overflow-hidden xl:col-span-2">
        <Map />
      </div>
      <div className="box scenes w-[50%] md:w-full h-full bg-selection-0 rounded-2xl lg:row-span-1 md:row-span-2">
        <HistoryList />
      </div>
    </div>
  );
};

export default HistorySection;
