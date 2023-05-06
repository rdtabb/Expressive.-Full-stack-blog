import useProfileContext from "../../../hooks/useProfileContext";
import type { PostType } from "../../../types/Types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingPosts from "../../LoadingFillers/LoadingPosts";
import { Link } from "react-router-dom";

const Feed = () => {
  const { handleGetPosts, handleLike } = useProfileContext();
  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    }
  })
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: handleGetPosts,
  });

  if (postsQuery.isLoading) return <LoadingPosts />;

  return (
    <section className="feed">
      <ul className="posts">
        {postsQuery.data.map((post: PostType) => (
          <li className="item" key={post.post_id}>
            <Link
              className="feed__link"
              to={`/post/${post.post_id}`}
            >
              <div className="item__heading">
                <h2 className="item__header">{post.title}</h2>
                <p className="item__date">{post.display_time}</p>
              </div>
            </Link>
            <div className="item__body">
              <p>{post.content}</p>
              <div className="item__likes">
                <button 
                  onClick={() => likeMutation.mutate({
                    likes: post.likes,
                    id: post.post_id
                  })}
                  className="item__like-button item__like-button--active"
                >
                  <img src="../../public/like-icon.svg" alt="like-icon" />
                </button>
                <p>{post.likes}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Feed;
