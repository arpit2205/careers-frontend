import React from "react";

import { Routes, Route } from "react-router-dom";

import AllJobs from "../components/user/AllJobs";

const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllJobs />} />
      </Routes>
    </>
  );
};

export default AdminRouter;
