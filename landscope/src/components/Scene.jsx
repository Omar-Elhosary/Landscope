/* eslint-disable react/prop-types */
import { setScene } from "../store/SceneSlice";
import { activateSec } from "../store/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";

const Scene = ({ id, thumbnail, satellite, path, row }) => {
  const activeScene = useSelector((state) => state.scene.active_scene);
  const dispatch = useDispatch();

  const handleSceneChange = (id) => {
    dispatch(setScene(id));
  };

  return (
    <div
      key={id}
      onClick={() => handleSceneChange(id)}
      className={`flex justify-start items-start gap-4 cursor-pointer ${
        activeScene == id ? "bg-container-0" : "hover:shadow-lg"
      } p-5 transition-all`}
    >
      <img src={thumbnail} alt="Scene Thumbnail" className="w-20" />
      <div className="info w-full h-full flex justify-between">
        <div className="text">
          <p className="text-lg font-semibold mb-1">{satellite}</p>
          <p className="text-sm font-medium">
            <span className="text-gray-0 font-medium">Path : </span>
            {path}
          </p>
          <p className="text-sm font-medium">
            <span className="text-gray-0 font-medium">Row : </span>
            {row}
          </p>
        </div>
        <div className="icons flex items-center justify-center self-end bg-container-0 border border-gray-0/20 rounded-md overflow-hidden">
          <div
            className={`grid place-items-center w-fit h-fit p-2 ${
              activeScene == id ? "bg-primary-0" : ""
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
          <div
            onClick={() => dispatch(activateSec("analysis"))}
            className="grid place-items-center w-fit h-fit p-2 hover:bg-selection-0 text-white transition-all"
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
  );
};

export default Scene;
