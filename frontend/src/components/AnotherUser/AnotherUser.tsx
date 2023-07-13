import { useParams } from "react-router-dom";
import AFeed from "./AFeed/AFeed";
import AProfileData from "./AFeed/AProfileData/AProfileData";
import useAuserPosts from "../../hooks/useQueryHooks/useAuserPosts/userAuserPosts";
import useAuserData from "../../hooks/useQueryHooks/useAuserData/useAuserData";

const AnotherUser = () => {
  const { id } = useParams();
  const userPostsQuery = useAuserPosts(id);
  const userDataQuery = useAuserData(id);

  if (userPostsQuery.isLoading) {
    console.log("Loading posts...");
  } else if (userPostsQuery.isError) {
    console.log(userPostsQuery.error);
  }

  return (
    <>
      <AProfileData
        username={userDataQuery.data?.username}
        status={userDataQuery.data?.status}
        isError={userDataQuery.isError}
        isLoading={userDataQuery.isLoading}
      />
      <AFeed
        isLoading={userPostsQuery.isLoading}
        isError={userPostsQuery.isError}
        posts={userPostsQuery.data}
      />
    </>
  );
};

export default AnotherUser;
