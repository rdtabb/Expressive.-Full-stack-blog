import { createContext, ReactElement } from "react";
import { BASE_URL } from "../axios/axios";
import axios from "axios";

type GeneralFeedContextType = {
  handleGetAllPosts: () => Promise<any>;
};

const initState: GeneralFeedContextType = {
  handleGetAllPosts: async () => {},
};

export const GeneralFeedContext =
  createContext<GeneralFeedContextType>(initState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

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
