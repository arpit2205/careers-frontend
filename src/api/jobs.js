import axiosInstance from "./index";

// get all jobs
export const getAllJobs = async () => {
  const response = await axiosInstance.get("/api/user/job/all-jobs");
  return response.data;
};

// get specific job
export const getSpecificJob = async (jobId) => {
  const response = await axiosInstance.get(`/api/user/job/${jobId}`);
  return response.data;
};
