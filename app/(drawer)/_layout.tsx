import { useRef, useState } from 'react';
import { Switch } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Drawer } from 'expo-router/drawer';
import switchTheme from 'react-native-theme-switch-animation';


import useThemeColor from '@/hooks/useThemeColor';
import { useThemeContext } from '@/context/color-theme/colorThemeContext';

const CustomDrawer = ({ ...props}) => {
    const {theme, setTheme} = useThemeContext()
    const bg = useThemeColor({preset:"background"})
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
    }
    const handlePress = () => {
        switchTheme({
            switchThemeFunction: () => {
              setTheme(theme === 'light' ? 'dark' : 'light'); // your switch theme function
            },
            animationConfig: {
              type: 'fade',
              duration: 900,
            },
        })
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
            <DrawerItem label={theme === "dark" ? "Moon":"Sun"}
                onPress={handlePress} 
            />
        </DrawerContentScrollView>
    )
}

export default function Layout () {
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer drawerContent={({navigation}) => <CustomDrawer />} 
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