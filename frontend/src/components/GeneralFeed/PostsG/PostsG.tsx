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
    const result = await axios.get(`${BASE_URL}/allposts`);
    return result.data;
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
              <Link className="feed__link" to={`/generalfeed/${item.post_id}`}>
                <div className="item__heading">
                  <h2 className="item__header">{item.title}</h2>
                  <p className="item__date">{item.display_time}</p>
                </div>
              </Link>
              <div className="item__body">
                <p>{item.content}</p>
                <div className="item__likes">
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
                  <p>{item.likes}</p>
                </div>
              </div>
              <p>Checkout post comments...</p>
            </li>
          ))}
        </ul>
      </section>
    </ErrorBoundary>
  );
};

export default Posts;
