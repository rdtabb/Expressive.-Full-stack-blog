import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../axios/axios";
import type { AUser } from "../../../types/Types";

const useAuserData = (id: string | undefined) => {
  const getUserData = async () => {
    const response: AxiosResponse<AUser> = await axios.get(
      `${BASE_URL}/auserposts/${id}`,
    );
    return response.data;
  };

  return useQuery<AUser>({
    queryKey: ["auserdata"],
    queryFn: getUserData,
  });
};

export type useAuserDataType = ReturnType<typeof useAuserData>;

export default useAuserData;
