import { StyleSheet } from "react-native"

import ThemedText, { type ThemedTextProps } from "./ThemedText"

import { Colors } from "@/constants/Colors"

import useThemeColor from '@/hooks/useThemeColor'



const Button = ({children, style, ...restProps}:ThemedTextProps) => {
    const color = useThemeColor( {preset:"text"})
    const bg = useThemeColor({preset:"red-accent"})
    return (
        <ThemedText 
            style={[
                {color},
                {backgroundColor: bg, fontWeight:600},
                style
            ]} 
            type="button" {...restProps}
        >
            {children}
        </ThemedText>
    )
}

export default Button