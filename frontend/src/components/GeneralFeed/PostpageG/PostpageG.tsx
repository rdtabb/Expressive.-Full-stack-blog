import { useParams } from "react-router-dom";
import useDisplayComments from "../../../hooks/useDisplayComments";
import LoadingPost from "../../LoadingFillers/LoadingPost";
import { useQuery } from "@tanstack/react-query";
import useGeneralFeedContext from "../../../hooks/useGeneralFeedContext";
import type { PostType, CommentType } from "../../../types/Types";
import { useEffect } from "react";

const PostpageG = () => {
  const { id } = useParams();
  const { handleGetAllPosts } = useGeneralFeedContext();
  const { data: comments, isLoading: LoadingComment } = useDisplayComments(id);

  const { data: posts, isLoading: SearchingPost } = useQuery({
    queryKey: ["generalposts"],
    queryFn: handleGetAllPosts,
  });

  useEffect(() => {
    console.log(`you are on the general postpage wiwth id ${id}`)
  }, [])

  if (SearchingPost) {
    return (
      <section className="feed">
        <LoadingPost />
      </section>
    );
  }

  const post: PostType = posts.find((item: PostType) => {
    item.post_id.toString() === id;
  });

  return (
    <main className="new-post">
      <section className="item item--general" key={post.post_id}>
        <div className="item__heading">
          <h2 className="item__header">{post.title}</h2>
          <p className="item__date">{post.display_time}</p>
        </div>
        <div className="item__body">
          <p>{post.content}</p>
          <div className="item__likes">
            <button className="item__like-button item__like-button--active">
              <img src="../../public/like-icon.svg" alt="like-icon" />
            </button>
            <p>{post.likes}</p>
          </div>
        </div>
      </section>
      <section className="comments">
        <ul className="comments-list">
          {LoadingComment ? (
            <p>Loading comments</p>
          ) : (
            comments.map((comment: CommentType) => (
              <li key={comment.comment_id}>
                <p>{comment.creator_name}</p>
                <p>{comment.created_at}</p>
                <p>{comment.content}</p>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
};

export default PostpageG;
