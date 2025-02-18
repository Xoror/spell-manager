import { Text, type TextProps, StyleSheet, Animated } from 'react-native'

import useThemeColor from '@/hooks/useThemeColor'

export type ThemedTextProps = TextProps & {
    lightColor?: string
    darkColor?: string
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | "listLink" | "button" | "smallButton"
    centered?: boolean
}

const ThemedText = ({ style, lightColor, darkColor, type = 'default', centered, ...restProps }: ThemedTextProps) => {
    const color = useThemeColor({ lightColor, darkColor, preset:'text'})

    return (
        <Animated.Text
            style={[
                { color }, styles.default, styles[type], style, centered ? styles.centered : undefined
            ]}
            {...restProps}
        />
    )
}
export default ThemedText

export const baseFontSize = 16

const styles = StyleSheet.create({
    default: {
        fontSize: baseFontSize,
        lineHeight: 1.4*baseFontSize,
    },
    defaultSemiBold: {
        fontWeight: '600',
    },
    title: {
        fontSize: 2*baseFontSize,
        fontWeight: 'bold',
        lineHeight: 2*baseFontSize,
    },
    subtitle: {
        fontSize: 1.25*baseFontSize,
        fontWeight: 'bold',
        paddingInline: 0.75*baseFontSize,
        paddingBlock: 0.375*baseFontSize
    },
    link: {
        fontSize: baseFontSize,
        paddingInline: baseFontSize,
        paddingBlock: 0.5*baseFontSize
    },
    listLink: {
        fontSize: baseFontSize,
        paddingInline: baseFontSize,
        paddingBlock: 0.5*baseFontSize
    },
    centered: {
        textAlign:"center"
    },
    button: {
        fontSize: baseFontSize,
        paddingInline: baseFontSize,
        paddingBlock: 0.5*baseFontSize,
    },
    smallButton: {
        fontSize: 0.85*baseFontSize,
        paddingInline: 0.75*baseFontSize,
        paddingBlock: 0.25*baseFontSize,
    }
})
