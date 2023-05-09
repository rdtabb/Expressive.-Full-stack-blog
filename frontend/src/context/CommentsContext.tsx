import { createContext } from "react";
import { ChildrenType } from "../types/Types";
import axios from "axios";
import { BASE_URL } from "../axios/axios";

type CommentsContextType = {
    handleGetAllComments: (post_id: string | undefined) => Promise<any>,
};

const initState: CommentsContextType = {
    handleGetAllComments: async () => {},
};

export const CommentsContext = createContext<CommentsContextType>(initState);

export const CommentsContextProvider = ({ children }: ChildrenType) => {
    const handleGetAllComments = async (post_id: string | undefined) => {
        const { data } = await axios.get(`${BASE_URL}/post/${post_id}/comments`)
        return data
    }

    return (
        <CommentsContext.Provider value={{
            handleGetAllComments
        }}>
            {children}
        </CommentsContext.Provider>
    );
};
