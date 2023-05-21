import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../axios/axios";
import axios from "axios";
import type { ChildrenType } from "../types/Types";
import type { RegisterFormData } from "../components/LoginRegister/Register/Register";
import type { LoginFormData } from "../components/LoginRegister/Login/Login";

type LoginRegister = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (data: LoginFormData) => void;
  handleRegister: (data: RegisterFormData) => Promise<void>;
};

const initState: LoginRegister = {
  isAuth: false,
  setIsAuth: () => {},
  handleLogin: async () => {},
  handleRegister: async () => {},
};

export const LoginRegisterContext = createContext<LoginRegister>(initState);

export const LoginRegisterProvider = ({ children }: ChildrenType) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormData) => {
    await axios.post(`${BASE_URL}/register`, {
      nameReg: data.username,
      passwordReg: data.password,
    });

    navigate("/");
  };

  const handleLogin = (data: LoginFormData) => {
    axios
      .post(`${BASE_URL}/login`, {
        usernameLog: data.username,
        passwordLog: data.password,
      })
      .then((response) => {
        console.log(response)
        if (response.data.auth == true) {
          setIsAuth(true);
          navigate("/");
        } else if (response.data.message) {
          alert(response.data.message)
        }
      });
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/login`).then((response) => {
      if (response.data.auth == true) {
        setIsAuth(true);
      }
    });
  }, []);

  return (
    <LoginRegisterContext.Provider
      value={{
        isAuth,
        setIsAuth,
        handleLogin,
        handleRegister,
      }}
    >
      {children}
    </LoginRegisterContext.Provider>
  );
};
