import { ScrollView, View, type ViewProps, type ScrollViewProps, Animated } from 'react-native'

import useThemeColor from '@/hooks/useThemeColor'
import { forwardRef } from 'react'

export type ThemedViewProps = (ViewProps | ScrollViewProps) & {
    lightColor?: string,
    darkColor?: string,
    scroll?: boolean,
}

const ThemedView = forwardRef<any, ThemedViewProps>( ({ style, lightColor, darkColor, scroll=false, ...otherProps }, ref) => {
    const backgroundColor = useThemeColor({ lightColor, darkColor, preset:'background'})

    const Component = scroll ? Animated.ScrollView : Animated.View
    return (
        <Component ref={ref} style={[{ backgroundColor }, style]} {...otherProps} />
    )
})

export default ThemedView