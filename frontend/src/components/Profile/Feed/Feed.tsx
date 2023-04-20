import useProfileContext from "../../../hooks/useProfileContext"
import type { PostType } from "../../../types/Types"

const Feed = () => {
  const { postsQuery } = useProfileContext()

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <section className="feed">
      <ul className="posts">
        {postsQuery.data.map((post: PostType) => (
          <li key={post.post_id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Feed
