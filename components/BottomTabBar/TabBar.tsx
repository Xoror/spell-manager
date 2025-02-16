import { Pressable, Platform, StyleProp, ViewStyle, View } from "react-native";
import { useLinkBuilder, useNavigation as nativeNavigation } from "@react-navigation/native";
import {default as TabBarBackground} from "./TabBarBackground";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Link } from "expo-router"
import { useNavigation } from "expo-router";

import ThemedView from "../basic/ThemedView"
import ThemedText from "../basic/ThemedText";
import HapticTab from '@/components/BottomTabBar/HapticTab'

import useThemeColor from "@/hooks/useThemeColor"
import Icon from "../icons/Icon";

const TabBar = ({ state, descriptors, navigation }) => {
    const { buildHref } = useLinkBuilder();
    const drawerNavigation = nativeNavigation()
    const background = useThemeColor({preset:"background-dark"})
    const tabBarActiveColor = useThemeColor({preset:"tabIconSelected"})
    const tabBarInActiveColor = useThemeColor({preset:"tabIconDefault"})
    const tabBarBackground = useThemeColor({preset:"tabBarInactiveBackground"})
    const tabBarBorderColor = useThemeColor({preset:"dark"})
    const ParsedBackground = TabBarBackground ?? ThemedView
    return(
        <>
            <ParsedBackground style={{width:"100%", flexDirection:"row", backgroundColor:background, paddingTop:6, paddingBottom:4, borderTopWidth:1, borderTopColor:tabBarBorderColor}}>
                <HapticTab
                    onPress={() => {drawerNavigation.openDrawer()}}
                    style={{ opacity: 1, flex:1, alignItems:"center", justifyContent:"center" }}
                >
                    <Icon size={24} name="person" color={tabBarInActiveColor} style={{padding:0}} />
                    <ThemedText style={[{  color: tabBarInActiveColor, fontSize:12 },]}>
                        Menu
                    </ThemedText>
                </HapticTab>
                
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const numRoutes = state.routes.length
                    const label = options.title ?? route.name
                    const isSelected = state.index === index
                    const platformStyle: {position: ViewStyle["position"]} = Platform.select({
                        ios: {
                        // Use a transparent background on iOS to show the blur effect
                            position: 'absolute',
                        },
                        default: {position:null}
                    })

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        })
            
                        if (!isSelected && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    }
            
                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        })
                    }
                    return (
                        <HapticTab
                            key={route.name}
                            href={buildHref(route.name, route.params)}
                            accessibilityState={isSelected ? { selected: true } : {}}
                            accessibilityLabel={label}
                            accessibilityLargeContentTitle={label}
                            accessibilityShowsLargeContentViewer={true}
                            // FIXME: accessibilityRole: 'tab' doesn't seem to work as expected on iOS
                            accessibilityRole={ Platform.select({ ios: 'button', default: 'tab' }) }
                            // @ts-expect-error: keep for compatibility with older React Native versions
                            accessibilityStates={isSelected ? ['selected'] : []}
                            testID={options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ opacity: 1, flex:1, alignItems:"center", justifyContent:"center" }}
                        >
                            {options.tabBarIcon({color:isSelected ? tabBarActiveColor : tabBarInActiveColor})}
                            <ThemedText style={[{  color: isSelected ? tabBarActiveColor : tabBarInActiveColor, fontSize:12 }, platformStyle]}>
                                {label}
                            </ThemedText>
                        </HapticTab>
                    )

                })}
            </ParsedBackground>
        </>
    )
}

export default TabBar

/*
    tabBarActiveTintColor: tabBarActiveColor,
    tabBarInactiveTintColor: tabBarInActiveColor,
    tabBarActiveBackgroundColor: tabBarBackground,
    tabBarInactiveBackgroundColor: tabBarBackground,
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: Platform.select({
        ios: {
        // Use a transparent background on iOS to show the blur effect
        position: 'absolute',
        },
        default: {},
    }),
*/