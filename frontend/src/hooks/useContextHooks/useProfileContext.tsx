import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";

const useProfileContext = () => {
    return useContext(ProfileContext)
}

export default useProfileContext