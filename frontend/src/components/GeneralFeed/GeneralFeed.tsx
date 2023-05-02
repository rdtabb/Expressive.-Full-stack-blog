import useGeneralFeedContext from "../../hooks/useGeneralFeedContext"
import LoadingPosts from "../LoadingFillers/LoadingPosts"
import type { PostType } from "../../types/Types"
import { useQuery } from "@tanstack/react-query"

const GeneralFeed = () => {
  const { handleGetAllPosts } = useGeneralFeedContext()

  const generalPosts = useQuery({
    queryKey: ["generalposts"],
    queryFn: handleGetAllPosts,
  })

  if (generalPosts.isLoading) return <LoadingPosts />

  return (
    <ul>
      {generalPosts.data.map((item: PostType) => (
        <li key={item.post_id}>
          <p>{item.title}</p>
          <p>{item.content}</p>
        </li>
      ))}
    </ul>
  )
}

export default GeneralFeed
