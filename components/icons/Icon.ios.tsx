import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolView, SymbolViewProps, SymbolWeight, type SFSymbol } from 'expo-symbols'
import { useIconContext } from './Icon'

const materialToIosNames = {
    // See MaterialIcons here: https://icons.expo.fyi
    // See SF Symbols in the SF Symbols app on Mac.
    'home': 'house.fill',
    'send': 'paperplane.fill',
    'code': 'chevron.left.forwardslash.chevron.right',
    'chevron-right': 'chevron.right',
    'add': 'plus',
    'remove': 'minus',
    'menu-book':'book',
    'person': 'person.fill'
} as Partial<
    Record<
        React.ComponentProps<typeof MaterialIcons>["name"],
        SFSymbol 
    >
>

export type IconSymbolPropsIOS = Partial<SymbolViewProps> & {color?:string}

const Icon = ( { name, size = 24, color, style, weight, }: IconSymbolPropsIOS ) => {
    const parsedName = materialToIosNames[name]
    const context = useIconContext() as IconSymbolPropsIOS
    let parsedColor = color
    let parsedSize = size
    let parsedStyle = style
    let parsedWeight = weight
    if(context) {
        parsedColor = color ?? context.color
        parsedSize = size ?? context.size
        parsedStyle = style ?? context.style
        parsedWeight = weight ?? context.weight
    }
    return (
        <SymbolView
            weight={parsedWeight}
            tintColor={parsedColor.toString()}
            resizeMode="scaleAspectFit"
            name={parsedName}
            style={[
                {
                width: parsedSize,
                height: parsedSize,
                },
                parsedStyle,
            ]}
        />
    )
}
export default Icon
