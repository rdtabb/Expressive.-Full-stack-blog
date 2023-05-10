import { useContext } from "react";
import { CommentsContext } from "../../context/CommentsContext";

const useCommentsContext = () => {
  return useContext(CommentsContext);
};

export default useCommentsContext;
