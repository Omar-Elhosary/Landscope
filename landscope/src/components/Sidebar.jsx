import logo from "../../src/assets/images/logo.png";
import Map from "../../src/assets/icons/map.png";
import ActiveMap from "../../src/assets/icons/map-white.png";
import Overpass from "../../src/assets/icons/overpasses.png";
import ActiveOverpass from "../../src/assets/icons/overpasses-white.png";
import History from "../../src/assets/icons/pending.png";
import ActiveHistory from "../../src/assets/icons/pending-white.png";
import Scenes from "../../src/assets/icons/scenes.png";
import ActiveSenes from "../../src/assets/icons/scenes-white.png";
import Analysis from "../../src/assets/icons/analysis.png";
import ActiveAnalysis from "../../src/assets/icons/analysis-white.png";
import { activateSec } from "../store/sidebarSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const state = useSelector((state) => state.sidebar.active_section);
  const dispatch = useDispatch();

  return (
    <div className="sidebar w-24 h-[100vh] px-2 bg-dark-1-0 flex flex-col gap-10">
      <img src={logo} alt="Landscope" className="w-24 mt-5" />

      <ul className="w-full flex flex-col justify-center items-center gap-5">
        <li className={state == "map" ? "active" : ""}>
          <button
            className="icon-container w-full h-full p-2"
            onClick={() => dispatch(activateSec("map"))}
          >
            <img
              src={state == "map" ? ActiveMap : Map}
              alt="Active Map"
              className="icon"
            />
          </button>
        </li>
        <li className={state == "overpass" ? "active" : ""}>
          <button
            className="icon-container w-full h-full p-2"
            onClick={() => dispatch(activateSec("overpass"))}
          >
            <img
              src={state == "overpass" ? ActiveOverpass : Overpass}
              alt="Overpass"
              className="icon"
            />
          </button>
        </li>
        <li className={state == "history" ? "active" : ""}>
          <button
            className="icon-container w-full h-full p-2"
            onClick={() => dispatch(activateSec("history"))}
          >
            <img
              src={state == "history" ? ActiveHistory : History}
              alt="history"
              className="icon"
            />
          </button>
        </li>
        <li className={state == "scenes" ? "active" : ""}>
          <button
            className="icon-container w-full h-full p-2"
            onClick={() => dispatch(activateSec("scenes"))}
          >
            <img
              src={state == "scenes" ? ActiveSenes : Scenes}
              alt="Scenes"
              className="icon"
            />
          </button>
        </li>
        <li className={state == "analysis" ? "active" : ""}>
          <button
            className="icon-container w-full h-full p-2"
            onClick={() => dispatch(activateSec("analysis"))}
          >
            <img
              src={state == "analysis" ? ActiveAnalysis : Analysis}
              alt="Analysis"
              className="icon"
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
