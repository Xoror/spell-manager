import BouncyCheckbox, {type BouncyCheckboxProps} from "react-native-bouncy-checkbox"

import useThemeColor from '@/hooks/useThemeColor'

export type ThemedCheckboxType = {
    darkColor?: string,
    lightColor?: string
} & BouncyCheckboxProps

const ThemedCheckbox = ({style, darkColor, lightColor, iconStyle, iconImageStyle, innerIconStyle,...restProps}:ThemedCheckboxType) => {
    const tickColor = useThemeColor({darkColor, lightColor, preset:"background"})
    const bg = useThemeColor({darkColor, lightColor, preset:"red-accent-high"})
    const unfillBg = useThemeColor({darkColor, lightColor, preset:"red-black"})
    return (
        <BouncyCheckbox 
            fillColor={bg} unFillColor={unfillBg} 
            style={[style]} iconImageStyle={[{tintColor:tickColor, height: "70%", width: "70%"}, iconImageStyle]} 
            innerIconStyle={[{ borderRadius: 0, transform: "none" }, innerIconStyle]} iconStyle={[{ borderRadius: 0 }, iconStyle]}
            bounceEffectIn={1} bounceEffectOut={1} bounceVelocityIn={1} bounceVelocityOut={1} bouncinessIn={0} bouncinessOut={0}
            {...restProps}
        />
    )
}

export default ThemedCheckbox