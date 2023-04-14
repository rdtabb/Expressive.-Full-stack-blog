import axios from "axios";

axios.defaults.withCredentials = true
export const BASE_URL: string = 'http://localhost:8005'

export const handleRegister = async (
        nameReg: string, 
        passwordReg: string,
        setLoginName: React.Dispatch<React.SetStateAction<string>>,
        setLoginPass: React.Dispatch<React.SetStateAction<string>>
    ) => {
    axios.post(`${BASE_URL}/register`, {
      nameReg,
      passwordReg
    })
    setLoginName("")
    setLoginPass("")
}