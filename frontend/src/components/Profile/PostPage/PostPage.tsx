import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { state } = useLocation();

  return (
    <main className="new-post">
      <li className="item" key={id}>
        <div className="item__heading">
          <h2 className="item__header">{state.title}</h2>
        </div>
        <p>{state.content}</p>
        <div className="buttons">
          <Link to={`/post/${id}/edit`}>
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
