import React from "react";

// Components
import PageNotFound404 from "../components/PageNotFound404";

import AllJobs from "../components/user/AllJobs";
import JobDescription from "../components/user/JobDescription";

// Router
import { Routes, Route } from "react-router-dom";

const UserRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllJobs />} />
        <Route path="/job/:id" element={<JobDescription />} />
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </>
  );
};

export default UserRouter;
