import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../../axios/axios";

const useGetGivenComment = (post_id: string | undefined) => {
  const handleGetGivenPost = async (id: string | undefined) => {
    const result = await axios.get(`${BASE_URL}/getPost/${id}`);
    return result.data;
  };

  return useQuery({
    queryKey: ["post", post_id],
    queryFn: () => handleGetGivenPost(post_id),
  });
};

export default useGetGivenComment;
