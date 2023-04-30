import { useParams, useLocation } from "react-router-dom";
import type { PostType } from "../../../types/Types";
import { useEffect } from "react";

type StateType = {
  state: {
    post: PostType
  }
}

const EditPost = () => {
  const { id } = useParams();
  const { state }: StateType = useLocation();

  return (
    <main className="new-post">
      <div className="item">
        <h2 className="new-post__heading">Edit post</h2>
        <form onSubmit={(e) => e.preventDefault()} className="new-post__form">
          <label className="title-label" htmlFor="new-post__title">
            Title
          </label>
          <input
            id="new-post__title"
            className="new-post__title"
            placeholder="Set your title"
            type="text"
            value={state.post.title}
          />
          <label className="body-label" htmlFor="new-post__body">
            Post
          </label>
          <textarea
            id="new-post__body"
            className="new-post__body edit-post__body"
            placeholder="Text of your post"
            value={state.post.content}
          />
          <button className="new-post__submit" type="submit">
            Submit new post
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditPost;
