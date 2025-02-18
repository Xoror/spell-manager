import { useRef, useState } from 'react';
import { Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Drawer } from 'expo-router/drawer';
import switchTheme from 'react-native-theme-switch-animation';


import useThemeColor from '@/hooks/useThemeColor';
import { useThemeContext } from '@/context/color-theme/colorThemeContext';
import ThemedText from '@/components/basic/ThemedText';
import Icon from '@/components/icons/Icon';
import ThemedView from '@/components/basic/ThemedView';
import ListLink from '@/components/basic/ListLink';

const styles = StyleSheet.create({
    menuItem:{
        flexDirection:"row", 
        alignContent:"center", 
        gap:4, 
        paddingInline:12, 
        paddingBlock:12,
        marginBottom:4
    },
    icon: {
        padding:0, 
        aspectRatio:null
    }
})

const CustomDrawer = (props) => {
    const {theme, setTheme} = useThemeContext()
    const bg = useThemeColor({preset:"background"})
    const labelColor = useThemeColor({preset:"text"})
    const labelBgColor = useThemeColor({preset:"red-gray-4"})
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
    }
    const handlePress = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        /*
        switchTheme({
            switchThemeFunction: () => {
              setTheme(theme === 'light' ? 'dark' : 'light'); // your switch theme function
            },
            animationConfig: {
              type: 'fade',
              duration: 900,
            },
        })
            */
    }
    const switchRef = useRef(null)
    return(
        <DrawerContentScrollView style={{backgroundColor:bg}} {...props}>
            <Switch
                ref={switchRef}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{display:"none"}}
            />
            <ThemedText type='subtitle' style={{marginBottom:8}}>
                Menu
            </ThemedText>
            <TouchableOpacity onPress={handlePress}>
                <ThemedView style={[{backgroundColor:labelBgColor}, styles.menuItem]}>
                    <Icon color={labelColor} size={18} name={theme === "dark" ? "sunny":"nightlight"} style={[styles.icon]}/>
                    <ThemedText style={{color:labelColor}}>
                        {`Toggle ${theme === "dark" ? "light":"dark"} mode`}
                    </ThemedText>
                </ThemedView>
            </TouchableOpacity>
            <ListLink href={{ pathname: '/characters/manage' }}>
                <ThemedView style={[{backgroundColor:labelBgColor}, styles.menuItem]}>
                    <Icon color={labelColor} size={18} name={"manage-accounts"} style={[styles.icon]}/>
                    <ThemedText style={{color:labelColor}}>
                        Manage Accounts
                    </ThemedText>
                </ThemedView>
            </ListLink>
        </DrawerContentScrollView>
    )
}

export default function Layout () {
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer drawerContent={(restProps) => <CustomDrawer {...restProps}/>} 
                    screenOptions={{
                        drawerStyle: {
                          width: "50%",
                        },
                    }}
                >
                    <Drawer.Screen
                        
                        name="(tabs)" // This is the name of the page and must match the url from root
                        options={{
                            headerShown:false
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}