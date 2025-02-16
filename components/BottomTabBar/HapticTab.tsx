import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import { onHapticPressIn } from '@/hooks/useHaptic'

const HapticTab = (props: BottomTabBarButtonProps) => {
    return (
        <PlatformPressable
            {...props}
            onPressIn={(event) => {
                onHapticPressIn(event)
                props.onPressIn?.(event)
            }}
        />
    )
}

export default HapticTab