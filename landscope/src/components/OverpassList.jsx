/* eslint-disable no-unused-vars */
import { useState } from "react";
import thumbnail from "../assets/images/thumbnail.jpg";
import { activateSec } from "../store/sidebarSlice";
import { setScene } from "../store/SceneSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Select, Option } from "@material-tailwind/react";
import { useRef } from "react";
import { useEffect } from "react";
import Overpass from "./Overpass";

const OverpassList = () => {
  const [view, setView] = useState("info");

  const bbox = useSelector((state) => state.scene.bbox).join(",");
  const api_key = "5wQEkU3cdFw9cYWSovNn4c";
  const satellites = "Landsat-8,Landsat-9";
  const url = `https://api.spectator.earth/overpass/?bbox=${bbox}&satellites=${satellites}&api_key=${api_key}`;
  const overpassesArr = useRef([]);
  const [overpasses, setOverpasses] = useState({});

  useEffect(() => {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setOverpasses(data);
      });
  }, []);

  return (
    <div className="pt-4 overflow-auto h-full rounded-2xl border border-gray-0/20">
      <header className="px-4">
        <h2 className="font-orbit tracking-wider font-semibold">
          Upcoming Overpasses
        </h2>
      </header>
      <div className="w-full h-0.5 bg-gray-0/20 mt-4"></div>
      {overpasses != {} &&
      overpasses.overpasses &&
      overpasses.overpasses.length > 0
        ? overpasses.overpasses.map((overpass) => {
            console.log(overpass.date + " " + overpass.satellite);

            return (
              <Overpass
                key={overpass.id}
                time={overpass.date}
                satellite={overpass.satellite}
              />
            );
          })
        : ""}

      <div></div>
    </div>
  );
};

export default OverpassList;
