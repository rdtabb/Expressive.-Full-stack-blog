import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import type { PostType } from "../../../types/Types";
import useProfileContext from "../../../hooks/useProfileContext";
import { useQuery } from "@tanstack/react-query";

const PostPage = () => {
  const { id } = useParams();
  const { handleGetPosts } = useProfileContext()

  const postsPageQuery = useQuery({
    queryKey: ["postsPage"],
    queryFn: handleGetPosts
  })

  if (postsPageQuery.isLoading) return <p>Loading your post</p>
  const post: PostType = postsPageQuery.data.find((item: PostType) => (
    (item.post_id).toString() === id
  ))

  return (
    <main className="new-post">
      <li className="item" key={id}>
        <div className="item__heading">
          <h2 className="item__header">{post?.title}</h2>
        </div>
        <p>{post?.content}</p>
        <div className="buttons">
          <Link state={{ post }} to={`/post/edit/${id}`}>
            <button className="post__delete post__edit">Edit Post</button>
          </Link>
          <button className="post__delete">
            Delete
          </button>
        </div>
      </li>
    </main>
  );
};

export default PostPage;
