import { createContext } from "react";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import type { ChildrenType } from "../types/Types";

type GeneralFeedContextType = {
  handleGetAllPosts: () => Promise<any>;
  handleGetGivenPost: (id: string | undefined) => Promise<any>;
};

const initState: GeneralFeedContextType = {
  handleGetAllPosts: async () => {},
  handleGetGivenPost: async () => {},
};

export const GeneralFeedContext =
  createContext<GeneralFeedContextType>(initState);

export const GeneralFeedContextProvider = ({ children }: ChildrenType) => {
  const handleGetAllPosts = async () => {
    const result = await axios.get(`${BASE_URL}/allposts`);
    return result.data;
  };

  const handleGetGivenPost = async (id: string | undefined) => {
    const result = await axios.get(`${BASE_URL}/getPost/${id}`);
    return result.data;
  };

  return (
    <GeneralFeedContext.Provider
      value={{
        handleGetAllPosts,
        handleGetGivenPost,
      }}
    >
      {children}
    </GeneralFeedContext.Provider>
  );
};
