import axiosInstance from "./index";

// get all jobs
export const getAllJobs = async () => {
  const response = await axiosInstance.get("/api/user/job/all-jobs");
  return response.data;
};
