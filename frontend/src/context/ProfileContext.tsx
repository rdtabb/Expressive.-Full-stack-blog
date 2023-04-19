import { createContext, ReactElement, useEffect, useCallback, useState } from "react";
import useLoginRegister from "../hooks/useLoginRegister";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import type { UserType } from "../types/Types";
import type { PostType } from "../types/Types";
import { useQuery, useMutation } from "@tanstack/react-query";


type ProfileContext = {
    handleLogOut: () => Promise<void>,
    user: UserType,
    userPosts: PostType[],
    setUserPosts: React.Dispatch<React.SetStateAction<PostType[]>>
}

const initState: ProfileContext = {
    handleLogOut: async () => {},
    user: {username: null, user_id: null},
    userPosts: [],
    setUserPosts: () => {}
}

export const ProfileContext = createContext<ProfileContext>(initState)

type ChildrenType = {
    children?: ReactElement | ReactElement[];
};

export const ProfileContextProvider = ({children}: ChildrenType) => {
    const [user, setUser] = useState<UserType>({username: null,user_id: null})
    const [userPosts, setUserPosts] = useState<PostType[]>([])
    const { setIsAuth, isAuth } = useLoginRegister()
    const navigate = useNavigate()
 
    const handleLogOut = async () => {
        await axios.delete(`${BASE_URL}/logout`)
        navigate('/login')
        setIsAuth(false)
    }

    const handleGetUserData = useCallback(async () => {
        const result = await axios.get(`${BASE_URL}/login`)
        const userData: UserType = result.data.user[0]
        setUser(userData)
    }, [])

    const handleGetPosts = useCallback(async () => {
        const result = await axios.get(`${BASE_URL}/userposts`)
    }, [])

    useEffect(() => {
        handleGetUserData()
    }, [isAuth])

    return (
        <ProfileContext.Provider value={{ handleLogOut, user, userPosts, setUserPosts }}>
            {children}
        </ProfileContext.Provider>
    )
}
