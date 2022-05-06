import React, { useState, useContext, createContext } from "react";

const jobsContext = createContext();

export const useJobs = () => {
  return useContext(jobsContext);
};

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  return (
    <jobsContext.Provider
      value={{ jobs, setJobs, filteredJobs, setFilteredJobs }}
    >
      {children}
    </jobsContext.Provider>
  );
};
