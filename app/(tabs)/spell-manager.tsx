import React from "react";
import { Alert, Button, StyleSheet, View, Text } from "react-native"
import Animated, {SlideOutRight, SlideInRight} from 'react-native-reanimated';
import { Collapsible } from "@/components/Collapsible";
import spells from "../../constants/spellsSRD.json"

const ButtonTest = () => {
    const onButtonPress = () => {
        Alert.alert("button tap!!")
    }
    const spellTiers = [0,1,2,3,4,5,6,7,8,9]
    return (
        <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
            <View>
                <Button onPress={onButtonPress} title="Press me!" />
            </View>
            <View>
                {spellTiers.map(tier =>
                    <Collapsible title={"Tier "+tier} key={tier}>
                       {spells.filter(spell => spell.level === tier).map(spell => 
                            <Collapsible title={spell.name} key={spell.index}>
                                <View>
                                    <Text>{spell.desc}</Text>
                                </View>
                            </Collapsible>
                        )}
                    </Collapsible>
                )}
            </View>
        </Animated.View>
    )
}

export default ButtonTest