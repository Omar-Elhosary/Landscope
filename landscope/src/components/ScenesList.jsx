import { useEffect, useState } from "react";
import thumbnail from "../assets/images/thumbnail.jpg";
import { activateSec } from "../store/sidebarSlice";
import { setScene } from "../store/SceneSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Scene from "./Scene";

const ScenesList = () => {
  const [showControl, setShowControl] = useState(false);
  const [cloudValue, setCloudValue] = useState(0);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [scenes, setScenes] = useState({});

  let bbox = useSelector((state) => state.scene.bbox);
  bbox = bbox.map((coord) => coord.toFixed(3));
  const dispatch = useDispatch();

  const toggleControl = () => {
    setShowControl((prev) => !prev);
  };

  const handleCloudChange = (e) => {
    setCloudValue(e.target.value);
  };

  const loadScenes = () => {
    if (cloudValue != null && from != null && to != null) {
      const url = `https://planetarycomputer.microsoft.com/api/stac/v1/collections/landsat-c2-l2/items?bbox=${bbox.join(
        ","
      )}&datetime=${new Date(from).toISOString()}/${new Date(
        to
      ).toISOString()}&eo:cloud_cover=0/${cloudValue}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);

          setScenes(data);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      alert("Check Filter Validation");
    }
  };

  return (
    <div className="pt-4 overflow-auto h-full rounded-2xl border border-gray-0/20">
      <header className="px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="font-orbit tracking-wider font-semibold">Scenes</h2>
            <div className="px-2 py-1 rounded-sm bg-green-0 text-green-0">
              <span>...</span>
            </div>
          </div>
          <div className="toggle-filters" onClick={toggleControl}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
          </div>
        </div>
        <div className="filters">
          <div
            className={`control pt-2 flex flex-col gap-4 ${
              showControl ? "h-full" : "h-0"
            } overflow-hidden transition-all`}
          >
            <div className="time-range flex justify-center items-center gap-2 mt-1">
              <input
                type="date"
                className="px-2 py-1 rounded-md"
                onChange={(e) => setFrom(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
              <input
                type="date"
                className="px-2 py-1 rounded-md"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="cloud-cover flex justify-center items-center gap-2 mt-1">
              <span className="mr-1 font-medium">{cloudValue} %</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="17"
                viewBox="0 0 25 17"
                fill="none"
              >
                <path
                  d="M5.09976 6.09494C5.6851 2.63728 8.77528 0 12.5 0C16.2248 0 19.3149 2.63729 19.9002 6.09494C22.7606 6.35223 25 8.68991 25 11.5357C25 14.5536 22.4816 17 19.375 17H5.625C2.5184 17 0 14.5536 0 11.5357C0 8.68991 2.23944 6.35223 5.09976 6.09494Z"
                  fill="#5FAAAC"
                />
              </svg>
              <input
                type="range"
                className="outline-none"
                onInput={(e) => handleCloudChange(e)}
                onChange={(e) => handleCloudChange(e)}
                defaultValue={0}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M1.34436 0.230663C1.03682 -0.076879 0.5382 -0.0768895 0.230665 0.230642C-0.0768797 0.538174 -0.0768902 1.03679 0.230644 1.34433L5.09606 6.20979C4.69558 6.87633 4.41489 7.62308 4.2838 8.4203C1.88113 8.64279 1.25576e-06 10.6641 1.25576e-06 13.1249C1.25576e-06 15.7344 2.11546 17.8498 4.725 17.8498H16.275C16.4236 17.8498 16.5706 17.843 16.7157 17.8296L19.6554 20.7693C19.9629 21.0769 20.4616 21.0769 20.7691 20.7693C21.0767 20.4618 21.0767 19.9632 20.7691 19.6556L1.34436 0.230663ZM21 13.1249C21 14.3811 20.5098 15.5229 19.7102 16.3691L7.33983 3.99866C8.26875 3.459 9.34826 3.14997 10.5 3.14997C13.6288 3.14997 16.2245 5.43044 16.7162 8.4203C19.1189 8.64279 21 10.6641 21 13.1249Z"
                  fill="#5FAAAC"
                />
              </svg>
            </div>
            <button
              className="cta border-2 border-primary-0 font-orbit p-2 rounded"
              onClick={() => loadScenes()}
            >
              Load Scenes
            </button>
          </div>
        </div>
      </header>
      <div className="w-full h-0.5 bg-gray-0/20 mt-4"></div>
      <div>
        {
          // scenes.feature > 0 ? scenes.map((e) => {
          //   console.log(e);
          // }) : "No data allocated"
          scenes.features && scenes.features.length > 0
            ? scenes.features.map((e) => {
                <Scene
                  id={e.id}
                  thumbnail={"https://placehold.co/600x400"}
                  satellite={e.properities.platform}
                  path={e.properities["landsat:wrs_path"]}
                  row={e.properities["landsat:wrs_row"]}
                />;
              })
            : "No data allocated"
        }
        
        {/* <div
          key={"3rd_scene"}
          onClick={() => handleSceneChange("3rd_scene")}
          className={`flex justify-start items-start gap-4 cursor-pointer ${
            activeScene == "3rd_scene" ? "bg-container-0" : "hover:shadow-lg"
          } p-5 transition-all`}
        >
          <img src={thumbnail} alt="Scene Thumbnail" className="w-20" />
          <div className="info w-full h-full flex justify-between">
            <div className="text">
              <p className="text-lg font-semibold mb-1">Landsat 8</p>
              <p className="text-sm font-medium">
                <span className="text-gray-0 font-medium">Path : </span>138
              </p>
              <p className="text-sm font-medium">
                <span className="text-gray-0 font-medium">Row : </span>098
              </p>
            </div>
            <div className="icons flex items-center justify-center self-end bg-container-0 border border-gray-0/20 rounded-md overflow-hidden">
              <div
                className={`grid place-items-center w-fit h-fit p-2 ${
                  activeScene == "3rd_scene" ? "bg-primary-0" : ""
                } text-white transition-all`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                  />
                </svg>
              </div>
              <div className="grid place-items-center w-fit h-fit p-2 hover:bg-selection-0 text-white transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              </div>
              <div className="grid place-items-center w-fit h-fit p-2 hover:bg-selection-0 text-white transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          key={"3rd_scene"}
          onClick={() => handleSceneChange("3rd_scene")}
          className={`flex justify-start items-start gap-4 cursor-pointer ${
            activeScene == "3rd_scene" ? "bg-container-0" : "hover:shadow-lg"
          } p-5 transition-all`}
        >
          <img src={thumbnail} alt="Scene Thumbnail" className="w-20" />
          <div className="info w-full h-full flex justify-between">
            <div className="text">
              <p className="text-lg font-semibold mb-1">Landsat 8</p>
              <p className="text-sm font-medium">
                <span className="text-gray-0 font-medium">Path : </span>138
              </p>
              <p className="text-sm font-medium">
                <span className="text-gray-0 font-medium">Row : </span>098
              </p>
            </div>
            <div className="icons flex items-center justify-center self-end bg-container-0 border border-gray-0/20 rounded-md overflow-hidden">
              <div
                className={`grid place-items-center w-fit h-fit p-2 ${
                  activeScene == "3rd_scene" ? "bg-primary-0" : ""
                } text-white transition-all`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                  />
                </svg>
              </div>
              <div className="grid place-items-center w-fit h-fit p-2 hover:bg-selection-0 text-white transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              </div>
              <div className="grid place-items-center w-fit h-fit p-2 hover:bg-selection-0 text-white transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          key={"3rd_scene"}
          onClick={() => handleSceneChange("3rd_scene")}
          className={`flex justify-start items-start gap-4 cursor-pointer ${
            activeScene == "3rd_scene" ? "bg-container-0" : "hover:shadow-lg"
          } p-5 transition-all`}
        >
          <img src={thumbnail} alt="Scene Thumbnail" className="w-20" />
          <div className="info w-full h-full flex justify-between">
            <div className="text">
              <p className="text-lg font-semibold mb-1">Landsat 8</p>
              <p className="text-sm font-medium">
                <span className="text-gray-0 font-medium">Path : </span>138
              </p>
              <p className="text-sm font-medium">
                <span className="text-gray-0 font-medium">Row : </span>098
              </p>
            </div>
            <div className="icons flex items-center justify-center self-end bg-container-0 border border-gray-0/20 rounded-md overflow-hidden">
              <div
                className={`grid place-items-center w-fit h-fit p-2 ${
                  activeScene == "3rd_scene" ? "bg-primary-0" : ""
                } text-white transition-all`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                  />
                </svg>
              </div>
              <div className="grid place-items-center w-fit h-fit p-2 hover:bg-selection-0 text-white transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              </div>
              <div className="grid place-items-center w-fit h-fit p-2 hover:bg-selection-0 text-white transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ScenesList;
