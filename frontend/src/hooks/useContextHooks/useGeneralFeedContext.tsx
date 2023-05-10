import { useContext } from "react"
import { GeneralFeedContext } from "../../context/GeneralFeedContext"

const useGeneralFeedContext = () => {
  return useContext(GeneralFeedContext)
}

export default useGeneralFeedContext
