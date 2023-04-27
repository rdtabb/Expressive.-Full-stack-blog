import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import type { PostType } from "../../../types/Types";

type StateType = {
  state: {
    posts: PostType[]
  }
}

const EditPost = () => {
  const { id } = useParams();
  const { state }: StateType = useLocation();

  const post = state.posts.find(post => {
    (post.post_id).toString() === id
  })

  return (
    <main className="new-post">
      <li className="item" key={id}>
        <div className="item__heading">
          <h2 className="item__header">{post?.title}</h2>
        </div>
        <p>{post?.content}</p>
        <div className="buttons">
          <Link to={`/post/edit/${id}`}>
            <button className="post__delete post__edit">Edit Post</button>
          </Link>
          <button className="post__delete">
            Delete
          </button>
        </div>
      </li>
    </main>
  );
};

export default EditPost;
