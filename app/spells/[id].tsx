import React from "react"
import { StyleSheet, useWindowDimensions } from "react-native"
import { useLocalSearchParams, Stack } from "expo-router"

import ThemedView from "@/components/basic/ThemedView"
import {SpellCard} from "@/components/spells/SpellCard"
import SpellCardPathfinder from "@/components/spells/SpellCardPathfinder"

import spells from "../../constants/spellsSRD.json"
import spellsPathfinder from "@/constants/pathfinder-spells/tier-1.json"
import { parseSpellAPIResponse } from "../../utils/ParseResponseFunctions"
import { useHeaderHeight } from '@react-navigation/elements'

//import Dimensions from 'Dimensions'
//const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

const SpellById = () => {
    const { id } = useLocalSearchParams()
    const headerHeight = useHeaderHeight()
    const {height: windowHeight} = useWindowDimensions()
    //console.log(windowHeight, headerHeight)

    return (
        <ThemedView style={{...styles.screen}}>
            {true?
                <SpellCardPathfinder 
                    style={{height: windowHeight - headerHeight}}
                    data={spellsPathfinder.map(spell => spell._source).find(spell => spell.id.toString() === id)} 
                />
                :
                <SpellCard 
                    style={{height: windowHeight - headerHeight}}
                    data={parseSpellAPIResponse(spells.find(spell => spell.id.toString() === id))} 
                />
            }
        </ThemedView>
    )
}

export default SpellById