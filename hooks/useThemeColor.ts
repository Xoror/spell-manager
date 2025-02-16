/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors'
import { useThemeContext } from '@/context/color-theme/colorThemeContext'
import { useEffect, useMemo, useState, useRef } from 'react'
import { ColorValue, Animated } from 'react-native'
import { interpolateColor, useSharedValue, withTiming } from 'react-native-reanimated'

export type ThemeColorPropsType = {
    lightColor?: string,
    darkColor?: string,
    preset?: keyof typeof Colors.light & keyof typeof Colors.dark | "background-dark"
}
export type useThemeColorType = string | ColorValue

const useColorAnimation = (color) => {
    const anim = useMemo(() => new Animated.Value(0), [color]);
    const [finished, setFinished] = useState(true)
    const currentColor = useRef(color);
    const nextColor = useMemo(()=> color, [color]);
  
    const animColor = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [currentColor.current, nextColor],
    });
  
    useEffect(() => {
        setFinished(false)
        Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
        }).start(() => {
            currentColor.current = nextColor;
            setFinished(true)
        });
  
    }, [color]);
  
    return animColor;
}

const useThemeColor = ({lightColor, darkColor, preset}:ThemeColorPropsType) => {
    const theme = useThemeContext().theme

    const isCustomColor = {light: lightColor, dark: darkColor}
    const colorFromProps = isCustomColor[theme]

    let colorParsed
    let parsedColorName
    if (colorFromProps) {
        colorParsed = colorFromProps
    } else {
        switch(preset) {
                case "text": 
                    parsedColorName = "red-gray-1"
                    break
                case "background":
                    parsedColorName = "red-black"
                    break
                case "background-dark":
                    parsedColorName = "background"
                    break
                case "tint":
                    parsedColorName = "tint"
                    break
                case "icon":
                    parsedColorName = "red-gray-3"
                    break
                case "tabIconDefault":
                    parsedColorName = "red-gray-2"
                    break
                case "tabIconSelected":
                    parsedColorName = "red-accent-middle"
                    break
                case "inputBackground":
                    parsedColorName = "red-gray-4"
                    break
                case "inputPlaceholder":
                    parsedColorName = "red-gray-6"
                    break
                case "inputColor":
                    parsedColorName = "inputColor"
                    break
                default:
                    parsedColorName = preset
        }
        colorParsed = Colors[theme][parsedColorName]
    }
    return colorParsed
    const [color, setColor] = useState(colorParsed);
    const animatedColor = useColorAnimation(color)
    useEffect(() => {
        const isCustomColor = {light: lightColor, dark: darkColor}
        const colorFromProps = isCustomColor[theme]

        let colorParsed
        let parsedColorName
        if (colorFromProps) {
            colorParsed = colorFromProps
        } else {
            switch(preset) {
                    case "text": 
                        parsedColorName = "red-gray-1"
                        break
                    case "background":
                        parsedColorName = "red-black"
                        break
                    case "background-dark":
                        parsedColorName = "background"
                        break
                    case "tint":
                        parsedColorName = "tint"
                        break
                    case "icon":
                        parsedColorName = "red-gray-3"
                        break
                    case "tabIconDefault":
                        parsedColorName = "red-gray-2"
                        break
                    case "tabIconSelected":
                        parsedColorName = "red-accent-middle"
                        break
                    case "inputBackground":
                        parsedColorName = "red-gray-4"
                        break
                    case "inputPlaceholder":
                        parsedColorName = "red-gray-6"
                        break
                    case "inputColor":
                        parsedColorName = "inputColor"
                        break
                    default:
                        parsedColorName = preset
            }
            colorParsed = Colors[theme][parsedColorName]
        }
        setColor(colorParsed)
    }, [theme])
    return animatedColor
}

export default useThemeColor