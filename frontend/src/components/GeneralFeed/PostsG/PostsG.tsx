import axios from "axios";
import { BASE_URL } from "../../../axios/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingPosts from "../../LoadingFillers/LoadingPosts";
import type { PostType } from "../../../types/Types";
import useProfileContext from "../../../hooks/useContextHooks/useProfileContext";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import { Link } from "react-router-dom";

const Posts = () => {
  const { handleLike } = useProfileContext();
  const queryClient = useQueryClient();

  const handleGetAllPosts = async () => {
    const { data } = await axios.get(`${BASE_URL}/allposts`);
    return data;
  };

  const generalPosts = useQuery({
    queryKey: ["generalposts"],
    queryFn: handleGetAllPosts,
  });

  const likeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["generalposts"]);
    },
  });

  if (generalPosts.isLoading)
    return (
      <section className="feed feed--general">
        <LoadingPosts />
      </section>
    );

  return (
    <ErrorBoundary>
      <section className="feed feed--general">
        <ul className="posts posts--general">
          {generalPosts.data.map((item: PostType) => (
            <li className="item item--general" key={item.post_id}>
              <div className="item__heading">
                <Link
                  className="item__header-link"
                  to={`/generalfeed/${item.user_id}/user`}
                >
                  <h2 id={item.user_id} className="item__header">
                    {item.title}
                    <span className="item__creator">by {item.creator}</span>
                  </h2>
                </Link>
                <p className="item__date">{item.display_time}</p>
              </div>
              <div className="item__body">
                <p>{item.content}</p>
                <div className="item__likes">
                  <p>{item.likes}</p>
                  <button
                    onClick={() =>
                      likeMutation.mutate({
                        likes: item.likes,
                        id: item.post_id,
                      })
                    }
                    className="item__like-button item__like-button--active"
                  >
                    <img src="../../public/like-icon.svg" alt="like-icon" />
                  </button>
                </div>
              </div>
              <Link
                className="feed__link feed__link--comments"
                to={`/generalfeed/${item.post_id}`}
              >
                Checkout post comments...
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </ErrorBoundary>
  );
};

export default Posts;
