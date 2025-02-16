import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, Animated } from 'react-native'
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/commonjs/src/types'


import {SlideInLeft, SlideOutRight} from 'react-native-reanimated'

import HapticTab from '@/components/BottomTabBar/HapticTab'
import TabBar from '@/components/BottomTabBar/TabBar'
import TabBarBackground from '@/components/BottomTabBar/TabBarBackground'
import Icon from '@/components/icons/Icon'
import useThemeColor from '@/hooks/useThemeColor'

export default function TabLayout() {
    const background = useThemeColor({preset:"background"})

    const forSlide = ({ current }:any) => {
        return {
            sceneStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [-100, 0, 100],
                  }),
                },
              ],
              opacity: current.progress.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 1, 0],
              }),
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

    return (
        
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                sceneStyle: {
                    backgroundColor: background
                },
                headerShown: false,
                
                tabBarBackground: TabBarBackground,

                //animation:"shift"
                transitionSpec: config,
                sceneStyleInterpolator: forSlide
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    //animation:"shift",
                    title: 'Character Manager',
                    tabBarIcon: ({ color }) => <Icon size={24} name="person" color={color} style={{padding:0}} />,
                }}
            />
            <Tabs.Screen
                name="spells-browser"
                options={{
                    //animation:"shift",
                    title: 'Browse Spells',
                    tabBarIcon: ({ color }) => <Icon size={24} name="menu-book" color={color} style={{padding:0}} />,
                }}
                
            />
        </Tabs>
    )
}
