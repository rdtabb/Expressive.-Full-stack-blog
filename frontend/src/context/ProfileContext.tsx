import { createContext, ReactElement } from "react";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoginRegister from "../hooks/useLoginRegister";

type ProfileContext = {
    handleLogOut: () => Promise<void>
}

const initState: ProfileContext = {
    handleLogOut: async () => {}
}

export const ProfileContext = createContext<ProfileContext>(initState)

type ChildrenType = {
    children?: ReactElement | ReactElement[];
};

export const ProfileContextProvider = ({children}: ChildrenType) => {
    const { setIsAuth } = useLoginRegister()
    const navigate = useNavigate()
 
    const handleLogOut = async () => {
        await axios.delete(`${BASE_URL}/logout`)
        navigate('/login')
        setIsAuth(false)
    }

    return (
        <ProfileContext.Provider value={{ handleLogOut }}>
            {children}
        </ProfileContext.Provider>
    )
}
