// This file is a fallback for using MaterialIcons on Android and web.
import { createContext, useContext } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolWeight, type SymbolViewProps } from 'expo-symbols'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import React from 'react'
import { OpaqueColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { IconSymbolPropsIOS } from './Icon.ios'
import useThemeColor from '@/hooks/useThemeColor'


export type IconSymbolName = React.ComponentProps<typeof MaterialIcons>['name']

export type IconSymbolProps = {
    style?: StyleProp<TextStyle>,
} & IconProps<IconSymbolName>
export type IconContextType = Partial<IconSymbolProps> | IconSymbolPropsIOS

const IconContext = createContext(null)
export const IconContextProvider = ({children, value}:{children:React.ReactNode, value:IconContextType}) => {
    const color = useThemeColor({preset:"icon"})
    const defaultStyling = {
        size: 24,
        color,
        weight: 'regular',
    }
    return(
        <IconContext.Provider value={{...defaultStyling, ...value}}>
            {children}
        </IconContext.Provider>
    )
}
export const useIconContext = () => useContext<IconContextType>(IconContext)


const Icon = ({ name, size, color, style }: IconSymbolProps) => {
    const context = useIconContext() as IconSymbolProps
    let parsedColor = color
    let parsedSize = size
    let parsedStyle = style
    if(context) {
        parsedColor = color ?? context.color
        parsedSize = size ?? context.size
        parsedStyle = style ? [context.style, style] : context.style
    }
    return (
        <MaterialIcons color={parsedColor} size={parsedSize} name={name} style={parsedStyle} />
    )
}
export default Icon