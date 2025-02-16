import * as Haptics from 'expo-haptics'
import { type GestureResponderEvent } from 'react-native'

export const onHapticPressIn = (event: GestureResponderEvent) => {
    if (process.env.EXPO_OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
}