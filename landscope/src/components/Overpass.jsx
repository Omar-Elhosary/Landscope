/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { useEffect } from "react";
import axios from "axios";
// import scheduleEmail from "../../server.mjs";

const validateNot = (lead, real) => {
  let nowTime = new Date().toISOString().slice(0, 16);
  let leadTime = new Date(lead).toISOString().slice(0, 16);
  let realTime = real.slice(0, 16);

  if (leadTime < realTime && leadTime > nowTime) {
    return true;
  }

  return false;
};

// eslint-disable-next-line react/prop-types
const Overpass = ({ time, satellite }) => {
  const [view, setView] = useState("info");
  const [leadTime, setLeadTime] = useState(time);

  const sendMail = () => {
    if (!validateNot(leadTime, time)) {
      alert("Please Check Date Validation");
    } else {
      axios
        .post("http://localhost:4000/", {
          body: {
            leadTime: leadTime,
            email: "moazcomputereoi@gmail.com",
            subject: `${satellite.toUpperCase()} is to pass over your area`,
            message: `Prepare yourself! It will pass on ${time}`,
          },
        })
        .then(() => {
          //success
          console.log("success");
        })
        .catch(() => {
          console.log("failure");
        });
      setView("info");
    }
  };

  return (
    <div className="card bg-container-0 p-5 flex flex-col gap-2">
      <div className={`info-view ${view == "info" ? "" : "hidden"}`}>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-primary-0">
            <span className="w-max">{time}</span>
          </p>
          <button className="button" onClick={() => setView("not")}>
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
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
          </button>
        </div>
        <h3 className="text-lg font-bold">
          {satellite}{" "}
          <span className="text-base text-gray-0 font-normal">| OLI/TIRS</span>
        </h3>
      </div>
      <div
        className={`not-info flex flex-col gap-5 ${
          view == "not" ? "" : "hidden"
        }`}
      >
        <div>
          <span className="font-semibold">Time :</span>{" "}
          <input
            type="datetime-local"
            className="px-1 p-1 rounded"
            onChange={(e) => setLeadTime(e.target.value)}
            defaultValue={time}
          />
        </div>
        <div>
          <div className="w-fit">
            <Select label="Select a Method" className="text-white">
              <Option value="email">Email</Option>
            </Select>
          </div>
        </div>
        <button
          className="px-4 py-2 border-2 border-primary-0 rounded-full"
          onClick={() => sendMail()}
        >
          Notify Me
        </button>
      </div>
    </div>
  );
};

export default Overpass;
