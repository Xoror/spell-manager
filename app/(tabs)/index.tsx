import React from "react";
import { Link } from "expo-router";
import { Alert, Button, StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native"
import Animated, {SlideOutLeft, SlideInLeft} from 'react-native-reanimated';


import { Collapsible } from "@/components/Collapsible";
import spells from "../../constants/spellsSRD.json"
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const styles = StyleSheet.create({
    collapseHeader: {
        paddingInline: 8,
        paddingBlock: 5,
        //backgroundColor: "#212529",
        //color: "white"
    },
    collapseContainer: {
        //backgroundColor: "color-mix(in oklab, #212529, white 10%)",
        //color: "white"
    },
    link: {
        color: "white",
        padding: 8,
    }
})

const ListLink = ({children, ...props}:any) => {
    return(
        <Link asChild {...props}>
            <TouchableOpacity>
                {children}
            </TouchableOpacity>
        </Link>
    )
}

const SpellBrowser = () => {
    const onButtonPress = () => {
        //Alert.alert("button tap!!")
    }
    
    const spellTiers = [0,1,2,3,4,5,6,7,8,9]
    return (
        <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
            <ScrollView>
                <ThemedView>
                    {spellTiers.map(tier =>
                        <Collapsible title={"Tier "+tier} key={tier} headerStyle={styles.collapseHeader} containerStyle={styles.collapseContainer}>
                        {spells.filter(spell => spell.level === tier).map(spell => 
                                <ListLink key={spell.index} onPress={onButtonPress} style={styles.link} href={{
                                    pathname: '/spells/[id]',
                                    params: { id: spell.index, name: spell.name }
                                    }}
                                >
                                    <ThemedText>{spell.name}</ThemedText>
                                </ListLink>
                            )}
                        </Collapsible>
                    )}
                </ThemedView>
            </ScrollView>
        </Animated.View>
    )
}

export default SpellBrowser