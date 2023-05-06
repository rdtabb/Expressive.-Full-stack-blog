import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import type { ChildrenType } from "../types/Types";

type LoginRegister = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: () => void;
  handleRegister: () => Promise<void>,
  loginName: string,
  loginPass: string,
  regName: string,
  regPass: string,
  setLoginName: React.Dispatch<React.SetStateAction<string>>,
  setLoginPass: React.Dispatch<React.SetStateAction<string>>,
  setRegName: React.Dispatch<React.SetStateAction<string>>,
  setRegPass: React.Dispatch<React.SetStateAction<string>>,
};

const initState: LoginRegister = {
  isAuth: false,
  setIsAuth: () => {},
  handleLogin: async () => {},
  handleRegister: async () => {},
  loginName: "",
  loginPass: "",
  regName: "",
  regPass: "",
  setLoginName: () => {},
  setLoginPass: () => {},
  setRegName: () => {},
  setRegPass: () => {},
};

export const LoginRegisterContext = createContext<LoginRegister>(initState);

export const LoginRegisterProvider = ({ children }: ChildrenType) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loginName, setLoginName] = useState<string>("")
  const [loginPass, setLoginPass] = useState<string>("")

  const [regName, setRegName] = useState<string>("")
  const [regPass, setRegPass] = useState<string>("")

  const navigate = useNavigate()

  const handleRegister = async () => {
    axios.post(`${BASE_URL}/register`, {
      nameReg: regName,
      passwordReg: regPass,
    });
    setRegName("");
    setRegPass("");

    navigate("/login")
  };

  const handleLogin = () => {
    axios
      .post(`${BASE_URL}/login`, {
        usernameLog: loginName,
        passwordLog: loginPass,
      })
      .then((response) => {
        console.log(response);
      });
    setLoginName("");
    setLoginPass("");
    setIsAuth(true)

    navigate("/")
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/login`).then((response) => {
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
        handleRegister,
        loginName,
        loginPass,
        regName,
        regPass,
        setLoginName,
        setLoginPass,
        setRegName,
        setRegPass,
      }}
    >
      {children}
    </LoginRegisterContext.Provider>
  );
};
