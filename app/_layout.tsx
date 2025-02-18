import { useState, useEffect, useMemo, createContext, useContext, useLayoutEffect } from 'react'
import { Animated, useColorScheme } from 'react-native'
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/commonjs/src/types'

import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import 'react-native-reanimated'
import 'react-native-gesture-handler'

import { IconContextProvider } from '@/components/icons/Icon'
import { JsStack as Stack } from '@/components/stackNav/JSStack'

import { loadTheme, saveTheme } from '../data/ThemeData'
import StoreProvider from '@/context/store'
import { ThemeContextProvider } from '@/context/color-theme/colorThemeContext'
import { Colors } from '@/constants/Colors'
import { useSharedValue } from 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
})



export default function RootLayout() {
    const colorScheme = useColorScheme() ?? 'dark'
    const [theme, setTheme] = useState(colorScheme)
    useLayoutEffect(() => {
        loadTheme(setTheme)
    }, [])
    
    const headerBackgroundColor = Colors[colorScheme === "dark" ? "dark":"light"].background
    const headerTextColor = Colors[colorScheme === "dark" ? "dark":"light"]["red-gray-1"]
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    })
    const context = useMemo(() => ({
        color: Colors[colorScheme === "dark" ? "dark":"light"].text,
        size: 24,
        style:{padding:8, lineHeight:1.4*16, aspectRatio:1, textAlign:"center"}
    }) ,[colorScheme])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }
    const bgColor = Colors[theme === "dark" ? "dark":"light"].background
    const forSlide = ({ current, next, inverted, layouts: { screen } }:any) => {
        const progress = Animated.add(
          current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              })
            : 0
        )
      
        return {
          cardStyle: {
            transform: [
              {
                translateX: Animated.multiply(
                  progress.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [
                      screen.width, // Focused, but offscreen in the beginning
                      0, // Fully focused
                      screen.width * -0.6, // Fully unfocused
                    ],
                    extrapolate: 'clamp',
                  }),
                  inverted
                ),
              },
            ],
          },
        }
    }
    const config: TransitionSpec = {
        animation: "timing",
        config: {
            duration: 350
        }
        /*
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
        */
    }
    //console.log(Colors[colorScheme === "dark" ? "dark":"light"].text)

    return (
        <IconContextProvider
            value={context}
        >
            <StoreProvider>
                <ThemeContextProvider value={{theme, setTheme}}>
                    <Stack
                        id={undefined}
                        //contentStyle: { backgroundColor: bgColor }
                        screenOptions={{
                        //contentStyle: { backgroundColor: bgColor },
                            transitionSpec: {
                                open: config,
                                close: config
                            },
                            cardStyle: {
                                backgroundColor: bgColor
                            },
                            headerStyle: {
                                backgroundColor: headerBackgroundColor
                            },
                            headerTintColor: headerTextColor
                        }}
                    >
                        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                        <Stack.Screen name="spells/[id]"
                            options={({ route, ...restProps }) => {
                                return { 
                                    ...restProps,
                                    headerShown: true ,
                                    animation: "slide_from_right",
                                    gestureEnabled: true,
                                    cardStyleInterpolator: forSlide,
                                    title: route.params ? (route.params as any)["name"]+" ("+(route.params as any)["category"]+")" : "Title could not be fetched",
                                }
                            }}
                        />
                        <Stack.Screen name="characters/add" 
                            options={{ 
                                title:"",
                                headerShown: true ,
                                animation: "slide_from_right",
                                gestureEnabled: true
                            }} 
                        />
                        <Stack.Screen name="characters/manage" 
                            options={{ 
                                title:"Manage Characters",
                                headerShown: true ,
                                animation: "slide_from_right",
                                gestureEnabled: true
                            }} 
                        />
                        <Stack.Screen name="(modals)/filter-tiers" 
                            options={{ 
                                headerShown: false,
                                presentation:"transparentModal",
                                gestureEnabled: true
                            }} 
                        />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style={theme === "dark"?"light":"dark"} />
                </ThemeContextProvider>
            </StoreProvider>
        </IconContextProvider>
    )
}
