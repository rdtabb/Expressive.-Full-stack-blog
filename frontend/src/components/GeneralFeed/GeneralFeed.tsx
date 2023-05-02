import LoadingPosts from "../LoadingFillers/LoadingPosts";
import type { PostType } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../axios/axios";

const GeneralFeed = () => {
  const handleGetAllPosts = async () => {
    const result = await axios.get(`${BASE_URL}/allposts`);
    return result.data;
  };

  const generalPosts = useQuery({
    queryKey: ["generalposts"],
    queryFn: handleGetAllPosts,
  });

  if (generalPosts.isLoading) return <LoadingPosts />;

  return (
    <ul>
      {generalPosts.data.map((item: PostType) => (
        <li key={item.post_id}>
          <p>{item.title}</p>
          <p>{item.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default GeneralFeed;
