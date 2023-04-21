import { createContext, ReactElement } from "react";

type GeneralFeedContextType = {}

const initialState: GeneralFeedContextType = {}

export const GeneralFeedContext = createContext<GeneralFeedContextType>(initialState)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const GeneralFeedContextProvider = ({ children }: ChildrenType) => {
    return (
        <GeneralFeedContext.Provider value={{}}>
            {children}
        </GeneralFeedContext.Provider>
    )
}

