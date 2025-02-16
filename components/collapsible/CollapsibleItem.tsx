import { GestureResponderEvent, StyleProp, TextProps, TextStyle, TouchableOpacity, ViewProps, ViewStyle } from "react-native"
import ThemedView from "../basic/ThemedView"
import ThemedText from "../basic/ThemedText"
import Icon from "../icons/Icon"
import ListLink from "../basic/ListLink"

import useThemeColor from "@/hooks/useThemeColor"

import { SpellType } from "@/context/profilesSlice"

type CollapsibleItemType = {
    spell: SpellType,
    isAdding: boolean, 
    containerStyle?: StyleProp<ViewStyle>, 
    iconStyle?: StyleProp<TextStyle>, 
    onIconPress: (event: GestureResponderEvent) => void
}


const CollapsibleItem = ({spell, isAdding, containerStyle, iconStyle, onIconPress}:CollapsibleItemType) => {
    const collapseListItemIconBgColor = useThemeColor({preset:"red-gray-6"})
    const collapseListItemIconBorderColor = useThemeColor({preset:"red-gray-6"})
    return(
        <ThemedView key={spell.id} style={[{borderColor:collapseListItemIconBorderColor, borderBottomWidth:1}, containerStyle]}>
            <TouchableOpacity onPress={onIconPress}>
                {isAdding ? 
                    <Icon 
                        style={[iconStyle, {backgroundColor:collapseListItemIconBgColor}]} 
                        name="add" size={18}
                    /> : 
                    <Icon 
                        style={[iconStyle, {backgroundColor:collapseListItemIconBgColor}]} 
                        name="remove" size={18} 
                    />
                }
            </TouchableOpacity>
            <ListLink key={spell.id} href={{
                    pathname: '/spells/[id]',
                    params: { id: spell.id, name: spell.name }
                }}
            >
                <ThemedText type="link">{spell.name}</ThemedText>
            </ListLink>
        </ThemedView>
    )
}

export default CollapsibleItem