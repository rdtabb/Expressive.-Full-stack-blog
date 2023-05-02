import { createContext, ReactElement } from "react";
import { BASE_URL } from "../axios/axios";
import type { PostType } from "../types/Types";
import axios from "axios";

type GeneralFeedContextType = {
    handleGetAllPosts: () => Promise<any>
}

const initialState: GeneralFeedContextType = {
    handleGetAllPosts: async () => {}
}

export const GeneralFeedContext = createContext<GeneralFeedContextType>(initialState)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const GeneralFeedContextProvider = ({ children }: ChildrenType) => {
    const handleGetAllPosts = async () => {
        const result = await axios.get(`${BASE_URL}/allposts`)
        return result.data
    }

    return (
        <GeneralFeedContext.Provider value={{
            handleGetAllPosts
        }}>
            {children}
        </GeneralFeedContext.Provider>
    )
}

