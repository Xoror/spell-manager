import { StyleSheet } from "react-native"
import { Picker, type PickerProps, type PickerItemProps } from "@react-native-picker/picker"
import useThemeColor from "@/hooks/useThemeColor"
import { ReactNode } from "react"

export type ThemedPickerProps = PickerProps & {
    children?: ReactNode,
    lightColor?: string,
    darkColor?: string,
}

const styles = StyleSheet.create({
    picker: {
        textAlign: "center"
    },
    item: {
        backgroundColor:"red"
    }
})

const ThemedPicker = ({children, style, lightColor, darkColor, ...restProps}:ThemedPickerProps) => {
    const color = useThemeColor({ lightColor, darkColor, preset:'text'})
    const bg = useThemeColor({ lightColor, darkColor, preset:'inputBackground'})
    return (
        <Picker 
            style={[{ color }, { backgroundColor:bg }, styles.picker, style, ]}
            dropdownIconColor={color} {...restProps}
        >
            {children}
        </Picker>
    )
}

export type ThemedPickerItemProps = PickerItemProps & {
    lightColor?: string,
    darkColor?: string,
}

const ThemedPickerItem = ({style, lightColor, darkColor, ...restProps}:ThemedPickerItemProps) => {
    const color = useThemeColor({ lightColor, darkColor, preset: 'text' })
    const bg = useThemeColor({ lightColor, darkColor, preset: 'inputBackground' })
    return(
        <Picker.Item
            color={"red"}
            style={[styles.item, style]}
            {...restProps}
        />
    )
}


export default Object.assign(ThemedPicker, {
    Item: ThemedPickerItem
})