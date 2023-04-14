import { createContext, ReactElement, useState } from "react";

type LoginRegister = {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const initState: LoginRegister = {
    isAuth: false,
    setIsAuth: () => {}
}

export const LoginRegisterContext = createContext<LoginRegister>(initState)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const LoginRegisterProvider = ({children}: ChildrenType) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)

    return (
        <LoginRegisterContext.Provider value={{
            isAuth, 
            setIsAuth
        }}>
            {children}
        </LoginRegisterContext.Provider>
    )
}