
import { GestureResponderEvent, Platform, TouchableOpacity, type TouchableOpacityProps, Pressable } from "react-native"
import { Link, type LinkProps } from "expo-router"
import { openBrowserAsync } from "expo-web-browser"
import { LinkComponent } from "expo-router/build/link/Link"

export type ListLinkProps = {
    children?: React.ReactNode,
    onPress?: (event: React.MouseEvent<HTMLAnchorElement> | GestureResponderEvent) => void,
    external?: boolean,
    touchableOpacityProps?: TouchableOpacityProps
} & LinkProps

const ListLink = ({children, onPress, href, external, touchableOpacityProps, ...props} : ListLinkProps) => {
    const handlePress = async (event: React.MouseEvent<HTMLAnchorElement> | GestureResponderEvent) => {
        if(external && Platform.OS !== 'web') {
            // Prevent the default behavior of linking to the default browser on native.
            event.preventDefault()
            // Open the link in an in-app browser.
            await openBrowserAsync(href.toString())
        }
        onPress(event)
    }
    return(
        <Link asChild {...props} href={href} target={external ? "_blank" : null} onPress={handlePress} >
            <Pressable {...touchableOpacityProps}>
                {children}
            </Pressable>
        </Link>
    )
}

export default ListLink