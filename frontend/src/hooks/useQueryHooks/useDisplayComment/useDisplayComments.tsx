import { useQuery } from "@tanstack/react-query";
import useCommentsContext from "../../useContextHooks/useCommentsContext";

const useDisplayComments = (post_id: string | undefined) => {
    const { handleGetAllComments } = useCommentsContext()

    return useQuery({
        queryKey: ["comments", post_id],
        queryFn: () => handleGetAllComments(post_id)
    })
}

export default useDisplayComments;