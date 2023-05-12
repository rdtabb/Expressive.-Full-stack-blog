import useDisplayComments from "../../../../hooks/useQueryHooks/useDisplayComment/useDisplayComments";
import type { CommentType } from "../../../../types/Types";

type PropsType = {
  id: string | undefined;
};

const Comments = ({ id }: PropsType) => {
  const commentData = useDisplayComments(id);

  if (commentData.isLoading) {
    return <h1>Loading comments...</h1>;
  }

  return (
    <section className="comments">
      <ul className="comments-list">
        {commentData.data.length ? (
          commentData.data.map((comment: CommentType) => (
            <li key={comment.comment_id}>
              <p>{comment.creator_name}</p>
              <p>{comment.created_at}</p>
              <p>{comment.content}</p>
            </li>
          ))
        ) : (
          <p>Post has no comments</p>
        )}
      </ul>
    </section>
  );
};

export default Comments;
