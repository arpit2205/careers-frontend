import axiosInstance from "./index";
import { getAuthorizationHeader } from "./index";

// apply for a job
export const applyForJob = async (applicationData) => {
  const response = await axiosInstance.post(
    "/api/user/application/apply",
    applicationData,
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

// get my applications
export const getMyApplications = async () => {
  const response = await axiosInstance.get(
    "/api/user/application/my-applications",
    {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};
