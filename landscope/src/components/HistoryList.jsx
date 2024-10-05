import { useState } from "react";
import thumbnail from "../assets/images/thumbnail.jpg";
import { activateSec } from "../store/sidebarSlice";
import { setScene } from "../store/SceneSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const HistoryList = () => {
  const activeScene = useSelector((state) => state.scene.active_scene);
  const dispatch = useDispatch();

  const handleSceneChange = (key) => {
    dispatch(setScene(key));
  };

  return (
    <div className="pt-4 overflow-auto h-full rounded-2xl border border-gray-0/20">
      <header className="px-4">
        <div className="flex justify-between items-center">
          <h2 className="font-orbit tracking-wider font-semibold">History</h2>
        </div>
      </header>
      <div className="w-full h-0.5 bg-gray-0/20 mt-4"></div>
      <div>
        <div
          key={"1st_scene"}
          onClick={() => handleSceneChange("1st_scene")}
          className={`flex justify-start items-start gap-4 pointer-events-none ${
            activeScene == "1st_scene" ? "bg-container-0" : "hover:shadow-lg"
          } p-5 transition-all`}
        >
          <div className="w-[7.5rem] h-24 rounded-md bg-yellow-0 grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div className="info w-full h-full flex justify-between">
            <div className="text">
              <p className="text-lg font-semibold mb-1">Landsat 8</p>
              <p className="text-sm font-medium">
                <span className="text-gray-0 font-medium">Path : </span>138
              </p>
              <p className="text-sm font-medium">
                <span className="text-gray-0 font-medium">Row : </span>098
              </p>
              <p className="text-sm font-medium">
                <span className="text-yellow-0 font-medium mr-1">
                  Passed On :{" "}
                </span>
                24/12/2024 UTC+3 12:00 PM
              </p>
            </div>
            <div className="flex flex-col justify-between gap-5">
              <div className="w-fit h-fit px-2 py-1 rounded bg-yellow-0">
                <span className="text-yellow-0">Pending</span>
              </div>
            </div>
          </div>
        </div>
        <div
          key={"2nd_scene"}
          onClick={() => handleSceneChange("2nd_scene")}
          className={`flex justify-start items-start gap-4 cursor-pointer ${
            activeScene == "2nd_scene" ? "bg-container-0" : "hover:shadow-lg"
          } p-5 transition-all`}
        >
          <img src={thumbnail} alt="Scene Thumbnail" className="w-24" />
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
            <div className="icons flex items-center justify-center self-end bg-container-0 border border-gray-0/20 rounded-md overflow-hidden w-fit">
              <div
                className={`grid place-items-center w-fit h-fit p-2 ${
                  activeScene == "2nd_scene" ? "bg-primary-0" : ""
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
      </div>
    </div>
  );
};

export default HistoryList;
