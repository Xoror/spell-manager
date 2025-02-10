import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {SlideInLeft, SlideOutRight} from 'react-native-reanimated';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Browse Spells',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="spell-manager"
          options={{
            title: 'Spell Manager',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
