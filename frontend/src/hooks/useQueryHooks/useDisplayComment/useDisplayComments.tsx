import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../../axios/axios";

const useDisplayComments = (post_id: string | undefined) => {
    const handleGetAllComments = async (post_id: string | undefined) => {
        const { data } = await axios.get(`${BASE_URL}/post/${post_id}/comments`)
        return data
    }

    return useQuery({
        queryKey: ["comments", post_id],
        queryFn: () => handleGetAllComments(post_id)
    })
}

export default useDisplayComments;