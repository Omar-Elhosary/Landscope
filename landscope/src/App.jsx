import "./App.css";
import Sidebar from "./components/Sidebar";
import ScenesSection from "./components/ScenesSection.jsx";
import { useSelector } from "react-redux";
import HistorySection from "./components/HistorySection.jsx";
import OverpassSection from "./components/OverpassSection.jsx";
import AnalysisSection from "./components/AnalysisSection.jsx";
import MapSection from "./components/MapSection.jsx";

function App() {
  const active_section = useSelector((state) => state.sidebar.active_section);

  return (
    <div className="flex gap-4 h-[100vh] ">
      <Sidebar />
      <div className="w-full bg-container-0 m-5 p-5 rounded-3xl overflow-hidden">
        {active_section == "map" && <MapSection isInteractive={true} />}
        {active_section == "scenes" && <ScenesSection />}
        {active_section == "history" && <HistorySection />}
        {active_section == "overpass" && <OverpassSection />}
        {active_section == "analysis" && <AnalysisSection />}
      </div>
    </div>
  );
}

export default App;
