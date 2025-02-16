import React, { useEffect, useState } from "react"
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native"

import Header from "@/components/basic/Header"
import ThemedView from "@/components/basic/ThemedView"
import ThemedText  from "@/components/basic/ThemedText"
import Button from "@/components/basic/Button"
import ThemedPicker from "@/components/basic/ThemedPicker"
import {default as Select} from "@/components/basic/ThemedSelect"
import ListLink from "@/components/basic/ListLink"
import SpellBrowser from "./spells-browser"

import useProfilesSlice from "../../../context/useProfilesSlice"
import { Character } from "@/context/profilesSlice"
import { useThemeContext } from "@/context/color-theme/colorThemeContext"

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems:"center"
    },
    title: {
        flexGrow: 1,
    },
    picker: {
        flexGrow: 1,
        lineHeight:17
    },
    link: {
        flexGrow: 0,
    },
    centered: {
        alignSelf:"center",
        marginBlock:"auto"
    }
})

const CharacterManager = () => {
    const { activeCharacter, characters, changeActiveCharacter, deleteCharacter } = useProfilesSlice()
    const {theme, setTheme} = useThemeContext()
    
    
    const handleSelect = ({id}) => {
        //Alert.alert("button tap!!")
        if((activeCharacter as Character).id === id) return
        changeActiveCharacter({id})
        
    }
    const handleDeleteCharacter = () => {
        deleteCharacter({id:(activeCharacter as Character).id})
    }
    const safeteyAlert = () => {
        Alert.alert(`Deleting character ${(activeCharacter as Character).name}`, `Your are attempting to delete the character with name ${(activeCharacter as Character).name}. Are you sure you want to proceed?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => handleDeleteCharacter()
            },
        ])
    }

    return (
        <ThemedView style={{flex:1}}>
            <Header>
                {characters.length === 0 || activeCharacter === "none" ?
                    <ThemedText centered={true} type="subtitle" style={styles.title}>
                        No characters exist currently
                    </ThemedText>
                        :
                    <>
                        <TouchableOpacity onPress={safeteyAlert}>
                            <Button style={styles.link}>Delete</Button>
                        </TouchableOpacity>
                        <Select 
                            data={characters} value={(activeCharacter as Character).id} 
                            labelField="name" valueField="id" onChange={handleSelect}
                        />

                    </>
                }
                <ListLink href={{ pathname: '/characters/add' }} >
                    <Button style={styles.link}>New</Button>
                </ListLink>
            </Header>

            {characters.length === 0 ?
                <ThemedText style={styles.centered}>
                    No characters have been created yet!
                </ThemedText> : null
            }

            {activeCharacter === "none" && characters.length != 0 ?
                <>
                    <ThemedText style={styles.centered}>
                        No character selected!
                    </ThemedText>
                </> : null
            }

            {activeCharacter != "none" && activeCharacter.spells.length === 0 ?
                <ThemedView style={{padding: 24, width:"100%", alignItems:"center", gap:18}}>
                    <ThemedText>No Spells added to this character so far!</ThemedText>
                    <ListLink href="/(tabs)/spells-browser">
                        <Button>Go to spell Browser</Button>
                    </ListLink>
                </ThemedView> : null
            }

            {activeCharacter != "none" && activeCharacter.spells.length != 0 ? 
                <SpellBrowser spellList={activeCharacter.spells}/> : null
            }
        </ThemedView>
    )
}

export default CharacterManager