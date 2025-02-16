import React from "react"
import ThemedView from "../basic/ThemedView"
import ThemedText from "../basic/ThemedText"
import Icon from "../icons/Icon"
import useThemeColor from "@/hooks/useThemeColor"
import { StyleProp, TextStyle, ViewStyle } from "react-native"

type CollapsibleHeaderStyle = {
    children: React.ReactNode,
    isVisible: boolean,
    containerStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    iconStyle?: StyleProp<TextStyle>,
}

const CollapsibleHeader = ({children, isVisible, containerStyle, textStyle, iconStyle, ...restProps}:CollapsibleHeaderStyle) => {
    const collapseHeaderBackgroundColor = useThemeColor({preset:"red-gray-6"})
    const collapseHeaderBorderColor = useThemeColor({preset:"red-gray-4"})
    const collapseHeaderColor = useThemeColor({preset:"red-gray-1"})

    return (
        <ThemedView
            style={[
                containerStyle,
                {
                    backgroundColor:collapseHeaderBackgroundColor, 
                    borderColor:collapseHeaderBorderColor 
                }]
            }
            {...restProps}
        >
            <ThemedText type="defaultSemiBold" style={[textStyle, { color:collapseHeaderColor }]}>
                {children}
            </ThemedText>
            {!isVisible ?
                <Icon
                    name="chevron-right"
                    size={18}
                    style={[iconStyle, { padding:4}]}
                />
                    :
                    <Icon
                    name="keyboard-arrow-down"
                    size={18}
                    style={[iconStyle, { padding:4}]}
                />
            }
        </ThemedView>
    )
}

export default CollapsibleHeader