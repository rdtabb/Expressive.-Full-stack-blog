import useDisplayComments from "../../../../hooks/useQueryHooks/useDisplayComment/useDisplayComments";
import type { CommentType } from "../../../../types/Types";
import SubmitComment from "../SubmitComment/SubmitComment";
import CommentsEmpty from "./CommentsEmpty";

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
      <ul className="comlist comlist--general">
        {commentData.data.length ? (
          commentData.data.map((comment: CommentType) => (
            <li className="comment" key={comment.comment_id}>
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
    </section>
  );
};

export default Comments;
