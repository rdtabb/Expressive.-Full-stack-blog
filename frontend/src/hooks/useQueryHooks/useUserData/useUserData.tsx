import { UserType } from "../../../types/Types";
import { BASE_URL } from "../../../axios/axios";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useUserData = () => {
  const handleGetUserData = async () => {
    const result = await axios.get(`${BASE_URL}/user`);
    const userData: UserType = result.data[0];
    return userData;
  };

  return useQuery<UserType, Error>({
    queryKey: ["userdata"],
    queryFn: handleGetUserData
  })
};

export type useUserDataType = ReturnType<typeof useUserData>

export default useUserData;
