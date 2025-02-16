import {createContext, useContext} from "react"

export type ThemeContextType= {
    theme: "dark" | "light", 
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeContextType>({theme:"dark", setTheme:null})
export const ThemeContextProvider = ({children, value}:{children:React.ReactNode, value:ThemeContextType}) => {
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useThemeContext = () => useContext(ThemeContext)