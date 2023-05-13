import { createContext } from "react";
import { ChildrenType } from "../types/Types";
import axios from "axios";
import { BASE_URL } from "../axios/axios";
import { useState } from "react";
import { FormEvent } from "react";

type VariableType = {
  e: FormEvent<HTMLFormElement>;
  id: string | undefined;
};

type CommentsContextType = {
  handleSubmitComment: (variables: VariableType) => Promise<void>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
};

const initState: CommentsContextType = {
  handleSubmitComment: async () => {},
  setContent: () => {},
  content: "",
};

export const CommentsContext = createContext<CommentsContextType>(initState);

export const CommentsContextProvider = ({ children }: ChildrenType) => {
  const [content, setContent] = useState<string>("");

  const handleSubmitComment = async (variables: VariableType) => {
    variables.e.preventDefault();
    const date = new Date();
    const display_time = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
    await axios.post(`${BASE_URL}/post/${variables.id}/submitcomment`, {
      content,
      display_time,
    });
    setContent("");
  };

  return (
    <CommentsContext.Provider
      value={{
        handleSubmitComment,
        setContent,
        content,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
