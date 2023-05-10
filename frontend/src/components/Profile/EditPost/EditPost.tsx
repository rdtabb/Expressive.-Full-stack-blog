import { useParams, useLocation } from "react-router-dom";
import type { PostType } from "../../../types/Types";
import { useEffect, useState } from "react";
import useProfileContext from "../../../hooks/useContextHooks/useProfileContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type StateType = {
  state: {
    post: PostType
  }
}

const EditPost = () => {
  const { id } = useParams()
  const { state }: StateType = useLocation();
  const queryClient = useQueryClient()
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const { handleEditPost } = useProfileContext()

  const postMutation = useMutation({
    mutationFn: handleEditPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    }
  })

  useEffect(() => {
    setTitle(state.post.title)
    setContent(state.post.content)
  }, [])

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
            className="new-post__body edit-post__body"
            placeholder="Post content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button 
            className="new-post__submit" 
            type="button"
            onClick={() => postMutation.mutate({
              id, 
              title, 
              content
            })}
          >
            Submit new post
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditPost;
