import useProfileContext from "../../../hooks/useProfileContext"
import type { PostType } from "../../../types/Types"
import { useQuery } from "@tanstack/react-query"

const Feed = () => {
  const { handleGetPosts } = useProfileContext()

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: handleGetPosts
  })

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <section className="feed">
      <ul className="posts">
        {postsQuery.data.map((post: PostType) => (
          <li className="item" key={post.post_id}>
            <div className="item__heading">
              <h2 className="item__header">{post.title}</h2>
              <p className="item__date">{post.createdAt}</p>
            </div>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Feed
