import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../axios/axios";
import type { AUser } from "../../../types/Types";

const useAuserData = (id: string | undefined) => {
  const getUserData = async () => {
    const { data } = await axios.get(`${BASE_URL}/auserposts/${id}`);
    return data;
  };

  return useQuery<AUser>({
    queryKey: ["auserdata"],
    queryFn: getUserData,
  });
};

export default useAuserData;
