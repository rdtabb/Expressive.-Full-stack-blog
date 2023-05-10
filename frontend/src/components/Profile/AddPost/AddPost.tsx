import useProfileContext from "../../../hooks/useContextHooks/useProfileContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPost = () => {
  const queryCLient = useQueryClient()
  const { 
    title, content, setTitle, setContent, handleNewPost 
  } = useProfileContext();

  const feedMutation = useMutation({
    mutationFn: handleNewPost,
    onSuccess: () => {
      queryCLient.invalidateQueries(["posts"])
    }
  })

  return (
    <main className="new-post">
      <div className="item">
        <h2 className="new-post__heading">Create new post</h2>
        <form onSubmit={(e) => e.preventDefault()} className="new-post__form">
          <label className="title-label" htmlFor="new-post__title">
            Title
          </label>
          <input
            required
            id="new-post__title"
            className="new-post__title"
            placeholder="Post title..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="body-label" htmlFor="new-post__body">
            Post
          </label>
          <textarea
            id="new-post__body"
            className="new-post__body"
            placeholder="Post content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            disabled={feedMutation.isLoading}
            onClick={() => feedMutation.mutate()}
            className="new-post__submit"
            type="submit"
          >
            Submit new post
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewPost;
