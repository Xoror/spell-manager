import { StyleSheet } from "react-native"

import ThemedText, { type ThemedTextProps } from "./ThemedText"

import { Colors } from "@/constants/Colors"

import useThemeColor from '@/hooks/useThemeColor'



const Button = ({children, style, small, ...restProps}:(ThemedTextProps & {small?:boolean})) => {
    const color = useThemeColor( {preset:"text"})
    const bg = useThemeColor({preset:"red-accent"})
    return (
        <ThemedText 
            style={[
                {color},
                {backgroundColor: bg, fontWeight:600},
                style
            ]} 
            type={small ? "smallButton":"button"} {...restProps}
        >
            {children}
        </ThemedText>
    )
}

export default Button