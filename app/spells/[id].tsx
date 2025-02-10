import React from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {SpellCard} from "../../components/spells/SpellCard"
import SpellCardSkeleton from "@/components/skeletons/SpellCardSkeleton";

import spells from "../../constants/spellsSRD.json"
import { parseSpellAPIResponse } from "../../utils/ParseResponseFunctions"

const styles = StyleSheet.create({
    screnn: {
        width: "100%",              
        minWidth: "100%"
    },
    header: {
        width: "100%"
    }
})

const SpellById = () => {
    const { id, name } = useLocalSearchParams();
    console.log(id)
    return (
        <>
            <Stack.Screen options={{
                title: (name as string)
            }} />
            <ThemedView>
                <ThemedText>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.screnn}>
                {false?
                    <SpellCardSkeleton />
                    :
                    <SpellCard data={parseSpellAPIResponse(spells.find(spell => spell.index === id))} />
                }
            </ThemedView>
        </>
    )
}

export default SpellById