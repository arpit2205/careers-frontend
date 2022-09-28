import axiosInstance from "./index";
import { getAuthorizationHeader } from "./index";

// fetch my profile
export const getMyProfile = async () => {
  const response = await axiosInstance.get("/api/user/profile", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
  return response.data;
};

// create my profile
export const createMyProfile = async (profileData) => {
  const response = await axiosInstance.post("/api/user/profile", profileData, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
  return response.data;
};
