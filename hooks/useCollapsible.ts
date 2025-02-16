import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'

import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    measure
} from 'react-native-reanimated'


export type CollapsibleConfig = {
  heightOffset?: number
  duration?: number
  easing?: Animated.EasingFunction
  isVisible: boolean
}

/*
    Source: https://github.com/lukaszkurantdev/react-native-fast-collapsible/tree/main
*/

export function useCollapsible({
    isVisible,
    heightOffset = 0,
    duration = 150,
    easing = Easing.linear,
}: CollapsibleConfig) {
    const [componentHeight, setComponentHeight] = useState(0)
    const height = useSharedValue(heightOffset)

    useLayoutEffect(() => {
        cancelAnimation(height)
        if (isVisible) {
            height.value = withTiming(componentHeight, { duration, easing })
        } else {
            height.value = withTiming(heightOffset, { duration, easing })
        }
    }, [componentHeight, height, duration, heightOffset, isVisible, easing])

    const onLayout = useCallback(
        (event: LayoutChangeEvent) => {
            //console.log("onlayout")
            const measuredHeight = event.nativeEvent.layout.height

            if (Math.round(componentHeight) !== Math.round(measuredHeight)) {
                //console.log(Math.round(componentHeight), Math.round(measuredHeight))
                setComponentHeight(measuredHeight)
            }
        },
        [componentHeight]
    )

    const animatedStyles = useAnimatedStyle(() => ({ height: height.value }))

    return {
        onLayout,
        height,
        animatedStyles,
        maxHeight: componentHeight,
    }
}