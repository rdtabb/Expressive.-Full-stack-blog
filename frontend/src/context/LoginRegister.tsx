import { createContext, ReactElement, useState, useEffect } from "react";
import { BASE_URL } from "../axios/axios";
import axios from "axios";

type LoginRegister = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (nameLog: string, passwordLog: string, setLoginName: React.Dispatch<React.SetStateAction<string>>, setLoginPass: React.Dispatch<React.SetStateAction<string>>) => void;
  handleRegister: (nameReg: string, passwordReg: string, setRegName: React.Dispatch<React.SetStateAction<string>>, setRegPass: React.Dispatch<React.SetStateAction<string>>) => Promise<void>
};

const initState: LoginRegister = {
  isAuth: false,
  setIsAuth: () => {},
  handleLogin: async () => {},
  handleRegister: async () => {},
};

export const LoginRegisterContext = createContext<LoginRegister>(initState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const LoginRegisterProvider = ({ children }: ChildrenType) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleRegister = async (
    nameReg: string,
    passwordReg: string,
    setRegName: React.Dispatch<React.SetStateAction<string>>,
    setRegPass: React.Dispatch<React.SetStateAction<string>>
  ) => {
    axios.post(`${BASE_URL}/register`, {
      nameReg,
      passwordReg,
    });
    setRegName("");
    setRegPass("");
  };

  const handleLogin = (
    usernameLog: string,
    passwordLog: string,
    setLoginName: React.Dispatch<React.SetStateAction<string>>,
    setLoginPass: React.Dispatch<React.SetStateAction<string>>
  ) => {
    axios
      .post(`${BASE_URL}/login`, {
        usernameLog,
        passwordLog,
      })
      .then((response) => {
        console.log(response);
      });
    setLoginName("");
    setLoginPass("");
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/login`).then((response) => {
        console.log(response)
      if (response.data.auth == true) {
        setIsAuth(true)
      }
    })
  }, [])

  return (
    <LoginRegisterContext.Provider
      value={{
        isAuth,
        setIsAuth,
        handleLogin,
        handleRegister
      }}
    >
      {children}
    </LoginRegisterContext.Provider>
  );
};
