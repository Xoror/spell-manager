import { StyleSheet } from "react-native"
import { Dropdown } from 'react-native-element-dropdown'
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model"
import useThemeColor from "@/hooks/useThemeColor"

import { baseFontSize } from "./ThemedText"

export type ThemedPickerProps<T> = DropdownProps<T> & {
    lightColor?: string,
    darkColor?: string,
}

const styles = StyleSheet.create({
    text: {
        paddingInline:0.75*baseFontSize, 
        paddingBlock:0.5*baseFontSize,
        lineHeight: 1.4*baseFontSize,
    }
})

const ThemedPicker =<T,>({ style, mode="modal", darkColor, lightColor, iconColor, iconStyle, placeholderStyle, selectedTextStyle, ...restProps }:ThemedPickerProps<T>) => {
    const color = "white"// useThemeColor({darkColor, lightColor, preset: 'red-black2'})
    const bg = "black"// useThemeColor({darkColor, lightColor, preset: 'red-gray-3'})
    const borderColor = "white" //useThemeColor({darkColor, lightColor, preset: 'red-gray-5'})
    const activeColor = "blue" //useThemeColor({darkColor, lightColor, preset: 'red-accent-high'})
    return (
        <Dropdown mode={mode} showsVerticalScrollIndicator
            style={[{backgroundColor:bg, flexGrow:1}, style]}
            iconColor={iconColor ?? color} iconStyle={[styles.text, {marginRight:4}, iconStyle]}
            itemTextStyle={{color}}
            containerStyle={[{backgroundColor:bg, borderColor:borderColor, borderWidth:1,}]}
            activeColor={activeColor}
            placeholderStyle={[{color}, styles.text, placeholderStyle]} selectedTextProps={{numberOfLines:1}} selectedTextStyle={[{color}, styles.text, selectedTextStyle]}
            {...restProps}
        />
    )
}


export default ThemedPicker