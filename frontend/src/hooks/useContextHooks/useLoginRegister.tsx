import { useContext } from "react";
import { LoginRegisterContext } from "../../context/LoginRegister";

const useLoginRegister = () => {
    return useContext(LoginRegisterContext)
}

export default useLoginRegister