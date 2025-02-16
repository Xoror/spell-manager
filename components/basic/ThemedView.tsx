import { ScrollView, View, type ViewProps, type ScrollViewProps, Animated } from 'react-native'

import useThemeColor from '@/hooks/useThemeColor'

export type ThemedViewProps = (ViewProps | ScrollViewProps) & {
    lightColor?: string,
    darkColor?: string,
    scroll?: boolean,
}

const ThemedView =({ style, lightColor, darkColor, scroll=false, ...otherProps }: ThemedViewProps) => {
    const backgroundColor = useThemeColor({ lightColor, darkColor, preset:'background'})

    const Component = scroll ? Animated.ScrollView : Animated.View
    return (
        <Component style={[{ backgroundColor }, style]} {...otherProps} />
    )
}

export default ThemedView