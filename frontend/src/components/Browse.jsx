import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import anime from "../assets/anime.mp4";
import "./Browse.css";

const videoSource = anime;

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="Browse-body">
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <Navbar />
        <div className="max-w-7xl mx-auto my-10">
          <h1 className="font-bold text-xl my-10 Search">
            Search Results ({allJobs.length})
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job) => {
              return <Job key={job._id} job={job} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
