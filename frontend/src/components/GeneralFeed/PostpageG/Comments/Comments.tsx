import useDisplayComments from "../../../../hooks/useQueryHooks/useDisplayComment/useDisplayComments";
import type { CommentType } from "../../../../types/Types";

type PropsType = {
  id: string | undefined;
};

const Comments = ({ id }: PropsType) => {
  const commentData = useDisplayComments(id);

  return (
    <section className="comments">
      <ul className="comments-list">
        {commentData.isLoading ? (
          <p>Loading comments</p>
        ) : commentData.data.length ? (
          <p>Post has no comments</p>
        ) : (
          commentData.data.map((comment: CommentType) => (
            <li key={comment.comment_id}>
              <p>{comment.creator_name}</p>
              <p>{comment.created_at}</p>
              <p>{comment.content}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default Comments;
