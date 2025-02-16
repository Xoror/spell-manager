import { StyleSheet } from "react-native"
import ThemedView from "./ThemedView"
import { Colors } from "@/constants/Colors"
import useThemeColor from "@/hooks/useThemeColor"

import { type ThemedViewProps } from "./ThemedView"

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems:"center",
    },
})

const Header = ({children, style,...restProps}:ThemedViewProps) => {
    const borderColor = useThemeColor({preset:"dark"})
    const background = useThemeColor({preset:"background-dark"})
    return (
        <ThemedView
            style={[
                styles.header, 
                {
                    borderBottomWidth:1, 
                    borderBottomColor: borderColor,
                    backgroundColor: background
                },
                style
            ]}
            {...restProps}
        >
            {children}
        </ThemedView>
    )
}

export default Header