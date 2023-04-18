import { createContext, ReactElement, useEffect, useCallback, useState } from "react";
import useLoginRegister from "../hooks/useLoginRegister";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import { UserType } from "../types/Types";


type ProfileContext = {
    handleLogOut: () => Promise<void>,
    user: UserType
}

const initState: ProfileContext = {
    handleLogOut: async () => {},
    user: {username: null, user_id: null}
}

export const ProfileContext = createContext<ProfileContext>(initState)

type ChildrenType = {
    children?: ReactElement | ReactElement[];
};

export const ProfileContextProvider = ({children}: ChildrenType) => {
    const [user, setUser] = useState<UserType>({
        username: null,
        user_id: null
    })

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

    useEffect(() => {
        handleGetUserData()
    }, [isAuth])

    return (
        <ProfileContext.Provider value={{ handleLogOut, user }}>
            {children}
        </ProfileContext.Provider>
    )
}
