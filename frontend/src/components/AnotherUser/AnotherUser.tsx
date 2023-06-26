import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";

const AnotherUser = () => {
  const { id } = useParams();

  const getUserPosts = async () => {
    const { data } = await axios.get(`${BASE_URL}/auser/${id}`);
    return data;
  };

  const userPostsQuery = useQuery({
    queryKey: ["auserposts"],
    queryFn: getUserPosts,
  });

  if (userPostsQuery.isLoading) {
    console.log("Loading posts...");
  } else if (userPostsQuery.isError) {
    console.log(userPostsQuery.error);
  } else {
    console.log(userPostsQuery.data)
  }

  return <div></div>;
};

export default AnotherUser;
