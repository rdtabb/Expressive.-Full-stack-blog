import { createContext, ReactElement, useEffect, useCallback, useState } from "react";
import useLoginRegister from "../hooks/useLoginRegister";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import type { UserType, PostType } from "../types/Types";
import { useNavigate } from "react-router-dom";


type ProfileContext = {
    handleLogOut: () => Promise<void>,
    user: UserType,
    userPosts: PostType[],
    setUserPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
    handleGetPosts: () => Promise<any>,
    title: string,
    content: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    handleNewPost: () => Promise<void>,
    handleEditPost: (variables: VariablesType) => Promise<any>
}

const initState: ProfileContext = {
    handleLogOut: async () => {},
    handleNewPost: async () => {},
    user: {username: null, user_id: null},
    userPosts: [],
    setUserPosts: () => {},
    handleGetPosts: async () => {},
    handleEditPost: async () => {},
    title: "",
    content: "",
    setContent: () => {},
    setTitle: () => {},
}

export const ProfileContext = createContext<ProfileContext>(initState)

type VariablesType = {
    id: string | undefined,
    title: string,
    content: string
}

type ChildrenType = {
    children?: ReactElement | ReactElement[];
};

export const ProfileContextProvider = ({ children }: ChildrenType) => {
    const [user, setUser] = useState<UserType>({username: null,user_id: null})
    const [userPosts, setUserPosts] = useState<PostType[]>([])
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const { setIsAuth, isAuth } = useLoginRegister()
    const navigate = useNavigate()

    const handleDeletePost = async (id: number) => {
        await axios.delete(`${BASE_URL}/delete/${id}`)
        navigate("/")
    }

    const handleEditPost = async (variables: VariablesType) => {
        const title = variables.title
        const content = variables.content

        const result = await axios.patch(`${BASE_URL}/updatepost/${variables.id}`, {
            title: title, 
            content: content
        })
        console.log(result)
        navigate("/")
    }

    const handleGetPosts = async () => {
        const result = await axios.get(`${BASE_URL}/userposts`)
        const postsData = result.data
        return postsData
    }

    const handleNewPost = async () => {
        await axios.post(`${BASE_URL}/addpost`, {
            title,
            content
        })
        navigate("/")
    }

    const handleLogOut = async () => {
        await axios.delete(`${BASE_URL}/logout`)
        setIsAuth(false)
    }

    const handleGetUserData = useCallback(async () => {
        const result = await axios.get(`${BASE_URL}/login`)
        const userData: UserType = result.data.user[0]
        setUser(userData)
    }, [])

    useEffect(() => {
        handleGetUserData()
    }, [isAuth])

    return (
        <ProfileContext.Provider value={{ 
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
            handleEditPost
        }}>
            {children}
        </ProfileContext.Provider>
    )
}
