import type { PostType } from "../../../types/Types";
import LoadingPosts from "../../LoadingFillers/LoadingPosts";

type AFeedProps = {
  posts: PostType[];
  isLoading: boolean;
  isError: boolean;
};

const AFeed = ({ posts, isLoading, isError }: AFeedProps) => {
  if (isLoading) {
    return <LoadingPosts />;
  }

  if (isError) {
    console.log();
  }

  return (
    <>
      <section className="feed">
        <ul className="posts">
          {posts.map((item: PostType, index) => (
            <li key={index} className="item">
              <p>{item.creator}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default AFeed;
