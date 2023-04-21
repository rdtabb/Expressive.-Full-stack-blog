import { createContext, ReactElement, useEffect, useCallback, useState } from "react";
import useLoginRegister from "../hooks/useLoginRegister";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import type { UserType, PostType } from "../types/Types";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";


type ProfileContext = {
    handleLogOut: () => Promise<void>,
    user: UserType,
    userPosts: PostType[],
    setUserPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
    handleGetPosts: () => Promise<any>,
}

const initState: ProfileContext = {
    handleLogOut: async () => {},
    user: {username: null, user_id: null},
    userPosts: [],
    setUserPosts: () => {},
    handleGetPosts: async () => {},
}

export const ProfileContext = createContext<ProfileContext>(initState)

type ChildrenType = {
    children?: ReactElement | ReactElement[];
};

export const ProfileContextProvider = ({children}: ChildrenType) => {
    const [user, setUser] = useState<UserType>({username: null,user_id: null})
    const [userPosts, setUserPosts] = useState<PostType[]>([])
    const { setIsAuth, isAuth } = useLoginRegister()

    const handleGetPosts = async () => {
        const result = await axios.get(`${BASE_URL}/userposts`)
        const postsData = result.data
        return postsData
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
        <ProfileContext.Provider value={{ handleLogOut, user, userPosts, setUserPosts, handleGetPosts }}>
            {children}
        </ProfileContext.Provider>
    )
}
