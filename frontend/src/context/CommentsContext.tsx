import { createContext } from "react";
import { ChildrenType } from "../types/Types";
import axios from "axios";
import { BASE_URL } from "../axios/axios";

type CommentsContextType = {
    handleGetDisplayComment: (variable: PostIdVariable) => Promise<any>,
    handleGetAllComments: (variable: PostIdVariable) => Promise<any>,
};

const initState: CommentsContextType = {
    handleGetDisplayComment: async () => {},
    handleGetAllComments: async () => {},
};

export const CommentsContext = createContext<CommentsContextType>(initState);

type PostIdVariable = {
    post_id: number
}

export const CommentsContextProvider = ({ children }: ChildrenType) => {
    const handleGetDisplayComment = async (variable: PostIdVariable) => {
        const { data } = await axios.get(`${BASE_URL}/post/${variable.post_id}/comments/limited`)
        return data
    }

    const handleGetAllComments = async (variable: PostIdVariable) => {
        const { data } = await axios.get(`${BASE_URL}/post/${variable.post_id}/comments`)
        return data
    }

    return (
        <CommentsContext.Provider value={{
            handleGetDisplayComment,
            handleGetAllComments
        }}>
            {children}
        </CommentsContext.Provider>
    );
};
