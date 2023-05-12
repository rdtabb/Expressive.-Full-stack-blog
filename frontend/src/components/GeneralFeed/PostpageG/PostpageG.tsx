import { useParams } from "react-router-dom";
import LoadingPost from "../../LoadingFillers/LoadingPost";
import type { PostType } from "../../../types/Types";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import Comments from "./Comments/Comments";
import SubmitComment from "./SubmitComment/SubmitComment";
import useGetPost from "../../../hooks/useQueryHooks/useGetPost/useGetGivenPost";

const PostpageG = () => {
  const { id } = useParams();
  const postData = useGetPost(id);

  if (postData.isLoading) {
    return (
      <section className="feed">
        <LoadingPost />
      </section>
    );
  }

  return (
    <main className="new-post">
      {postData.data.map((post: PostType) => (
        <>
          <ErrorBoundary>
            <section key={post.post_id} className="item item--general">
              <div className="item__heading">
                <h2 className="item__header">{post?.title}</h2>
                <p className="item__date">{post?.display_time}</p>
              </div>
              <div className="item__body">
                <p>{post?.content}</p>
                <div className="item__likes">
                  <button className="item__like-button item__like-button--active">
                    <img src="../../public/like-icon.svg" alt="like-icon" />
                  </button>
                  <p>{post?.likes}</p>
                </div>
              </div>
            </section>
          </ErrorBoundary>
          <ErrorBoundary>
            <Comments id={String(post.post_id)} />
            <SubmitComment id={String(post.post_id)} />
          </ErrorBoundary>
        </>
      ))}
    </main>
  );
};

export default PostpageG;
