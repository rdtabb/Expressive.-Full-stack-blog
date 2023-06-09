import {
  createContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import useLoginRegister from "../hooks/useContextHooks/useLoginRegister";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import type { UserType, PostType, ChildrenType } from "../types/Types";
import { useNavigate } from "react-router-dom";

type handleLikeVariablesType = {
  likes: string;
  id: number;
};

type ProfileContext = {
  handleLogOut: () => Promise<void>;
  user: UserType;
  userPosts: PostType[];
  setUserPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  handleGetPosts: () => Promise<any>;
  title: string;
  content: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleNewPost: () => Promise<void>;
  handleEditPost: (variables: HandleEditParamsType) => Promise<any>;
  handleDeletePost: (variables: HandleDeleteParamsType) => Promise<void>;
  handleLike: (variables: handleLikeVariablesType) => Promise<void>;
  handleEditProfile: (variables: HandleUpdateProfileParamsType) => Promise<void>
};

const initState: ProfileContext = {
  handleLogOut: async () => {},
  handleNewPost: async () => {},
  user: {username: null, user_id: null, status: null},
  userPosts: [],
  setUserPosts: () => {},
  handleGetPosts: async () => {},
  handleEditPost: async () => {},
  handleDeletePost: async () => {},
  title: "",
  content: "",
  setContent: () => {},
  setTitle: () => {},
  handleLike: async () => {},
  handleEditProfile: async () => {},
};

export const ProfileContext = createContext<ProfileContext>(initState);

type HandleEditParamsType = {
  id: string | undefined;
  title: string;
  content: string;
};

type HandleDeleteParamsType = {
  id: string | undefined;
};

type HandleUpdateProfileParamsType = {
  username: string,
  status: string
}

export const ProfileContextProvider = ({ children }: ChildrenType) => {
  const [user, setUser] = useState<UserType>({username: null, user_id: null, status: null});
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { setIsAuth, isAuth } = useLoginRegister();
  const navigate = useNavigate();

  const handleEditProfile = async (variables: HandleUpdateProfileParamsType) => {
    await axios.patch(`${BASE_URL}/user/updateprofile`, {
      username: variables.username,
      status: variables.status
    })
  }

  const handleDeletePost = async (variables: HandleDeleteParamsType) => {
    await axios.delete(`${BASE_URL}/delete/${variables.id}`);
    navigate("/");
  };

  const handleEditPost = async (variables: HandleEditParamsType) => {
    const title = variables.title;
    const content = variables.content;

    await axios.patch(`${BASE_URL}/updatepost/${variables.id}`, {
      title: title,
      content: content,
    });
    navigate("/");
  };

  const handleGetPosts = async () => {
    const result = await axios.get(`${BASE_URL}/userposts`);
    const postsData = result.data;
    return postsData;
  };

  const handleNewPost = async () => {
    setTitle("")
    setContent("")
    const date = new Date();
    const displayTime = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
    await axios.post(`${BASE_URL}/addpost`, {
      title,
      content,
      displayTime
    });
    navigate("/");
  };

  const handleLike = async (variables: handleLikeVariablesType) => {
    const likesNum: number = Number(variables.likes) + 1;
    const likesStr: string = String(likesNum);
    await axios.patch(`${BASE_URL}/likepost/${variables.id}`, {
      likes: likesStr,
    });
  };

  const handleLogOut = async () => {
    await axios.delete(`${BASE_URL}/logout`);
    setIsAuth(false);
  };

  const handleGetUserData = useCallback(async () => {
    const result = await axios.get(`${BASE_URL}/login`);
    const userData: UserType = result.data.user[0];
    setUser(userData);
  }, []);

  useEffect(() => {
    handleGetUserData();
  }, [isAuth]);

  return (
    <ProfileContext.Provider
      value={{
        handleLogOut,
        user,
        userPosts,
        setUserPosts,
        handleGetPosts,
        title,
        content,
        setTitle,
        setContent,
        handleNewPost,
        handleEditPost,
        handleDeletePost,
        handleLike,
        handleEditProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
