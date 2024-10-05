/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import OverpassList from "./OverpassList.jsx";
import { useSelector } from "react-redux";
import { useRef } from "react";
import MapSection from "../components/MapSection.jsx";

const OverpassSection = () => {
  const [opacity, setOpacity] = useState(0);

  return (
    <div
      className={`w-full h-full flex items-start justify-evenly gap-4 md:flex-col lg:flex-row `}
    >
      <div className="box map w-full h-full bg-selection-0 rounded-2xl overflow-hidden xl:col-span-2">
        <MapSection />
      </div>
      <div className="box scenes xl:w-[40%] md:w-full h-full bg-selection-0 rounded-2xl lg:row-span-1 md:row-span-2">
        <OverpassList />
      </div>
    </div>
  );
};

export default OverpassSection;
