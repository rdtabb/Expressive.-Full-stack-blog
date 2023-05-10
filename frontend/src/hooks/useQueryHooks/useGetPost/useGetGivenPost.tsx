import useGeneralFeedContext from "../../useContextHooks/useGeneralFeedContext";
import { useQuery } from "@tanstack/react-query";
import type { PostType } from "../../../types/Types";

const useGetGivenComment = (post_id: string | undefined) => {
    const { handleGetGivenPost } = useGeneralFeedContext();

    return useQuery<PostType>({
        queryKey: ["post", post_id],
        queryFn: () => handleGetGivenPost(post_id)
    })
}

export default useGetGivenComment;