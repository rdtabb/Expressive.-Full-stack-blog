import { useParams } from "react-router-dom";
import useGetGivenComment from "../../../hooks/useQueryHooks/useGetPost/useGetGivenPost";
import LoadingPost from "../../LoadingFillers/LoadingPost";
import type { PostType } from "../../../types/Types";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import Comments from "./Comments/Comments";

const PostpageG = () => {
  const { id } = useParams();
  const postData = useGetGivenComment(id);
  const post: PostType | undefined = postData.data;

  if (postData.isLoading) {
    return (
      <section className="feed">
        <LoadingPost />
      </section>
    );
  }

  return (
    <main className="new-post">
      <section className="item item--general">
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
      <ErrorBoundary>
        <Comments id={id} />
      </ErrorBoundary>
    </main>
  );
};

export default PostpageG;
