import LoadingPost from "../../LoadingFillers/LoadingPost";
import SubmitComment from "../../GeneralFeed/PostpageG/SubmitComment/SubmitComment";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useProfileContext from "../../../hooks/useContextHooks/useProfileContext";
import useDisplayComments from "../../../hooks/useQueryHooks/useDisplayComment/useDisplayComments";
import type { PostType, CommentType } from "../../../types/Types";
import CommentsEmpty from "../../GeneralFeed/PostpageG/Comments/CommentsEmpty";

const PostPage = () => {
  const { id } = useParams();
  const { handleGetPosts, handleDeletePost } = useProfileContext();
  const queryClient = useQueryClient();
  const comments = useDisplayComments(id);

  const deleteMutation = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const postsPageQuery = useQuery({
    queryKey: ["postsPage"],
    queryFn: handleGetPosts,
  });

  if (postsPageQuery.isLoading) return <LoadingPost />;

  const post: PostType = postsPageQuery.data.find(
    (item: PostType) => item.post_id.toString() === id,
  );

  return (
    <main className="new-post new-post--ppage">
      <li className="item item--ppage" key={id}>
        <div className="item__heading">
          <h2 className="item__header">{post?.title}</h2>
        </div>
        <p>{post?.content}</p>
        <div className="buttons">
          <Link state={{ post }} to={`/post/edit/${id}`}>
            <button className="post__delete post__edit">Edit Post</button>
          </Link>
          <button
            onClick={() => deleteMutation.mutate({ id })}
            className="post__delete"
          >
            Delete
          </button>
        </div>
      </li>
      <section className="comments comments--ppage">
        <ul className="comlist">
          {comments.data?.length ? (
            comments.data?.map((comment: CommentType, index: number) => (
              <li key={index} className="comment">
                <div className="comment__infosec">
                  <p className="comment__creator">{comment.creator_name}</p>
                  <p className="comment__time">{comment.display_date}</p>
                </div>
                <p className="comment__body">{comment.content}</p>
              </li>
            ))
          ) : (
            <CommentsEmpty />
          )}
        </ul>
        <SubmitComment id={id} />
      </section>
    </main>
  );
};

export default PostPage;
