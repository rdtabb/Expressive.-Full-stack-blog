import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../axios/axios";
import axios from "axios";

const useAuserPosts = (id: string | undefined) => {
  const getUserPosts = async () => {
    const { data } = await axios.get(`${BASE_URL}/auser/${id}`);
    return data;
  };

  return useQuery({
    queryKey: ["auserposts"],
    queryFn: getUserPosts,
  });
};

export default useAuserPosts;
