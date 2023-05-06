import { createContext } from "react";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import type { ChildrenType } from "../types/Types";

type GeneralFeedContextType = {
  handleGetAllPosts: () => Promise<any>;
};

const initState: GeneralFeedContextType = {
  handleGetAllPosts: async () => {},
};

export const GeneralFeedContext =
  createContext<GeneralFeedContextType>(initState);

export const GeneralFeedContextProvider = ({ children }: ChildrenType) => {
  const handleGetAllPosts = async () => {
    const result = await axios.get(`${BASE_URL}/allposts`);
    return result.data;
  };

  return (
    <GeneralFeedContext.Provider
      value={{
        handleGetAllPosts,
      }}
    >
      {children}
    </GeneralFeedContext.Provider>
  );
};
