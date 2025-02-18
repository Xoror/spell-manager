import { useEffect, useRef, useState } from 'react'
import { TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from "expo-router"

import ThemedView from "@/components/basic/ThemedView"
import ThemedText from "@/components/basic/ThemedText"
import { ThemedTextInput } from "@/components/basic/ThemedTextInput"
import Button from "@/components/basic/Button"
import {default as Select} from "@/components/basic/ThemedSelect"

import useProfilesSlice from '@/context/useProfilesSlice'

import { useForm, Controller, FieldError } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useThemeColor from '@/hooks/useThemeColor'

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    addForm: {
        gap: 4,
        width: "60%",
        justifyContent:"center",
        marginBottom:16
    },
    manageForm: {
        width: "80%",
        gap:4,
        flex:1,
        marginBottom:16
    },
    characterName:{
        flex:1,
    }
})

const newCharacterSchema = z.object({
    name: z.string().min(1, "Has to be at least 1 character long!")
})
type IsEditingType = {
    id:string, 
    name:string, 
    index:number
}

const ManageCharacter = () => {
    const manageCharacterNameBg = useThemeColor({preset:"red-gray-5"})
    const manageCharacterNameColor = useThemeColor({preset:"red-gray-2"})
    const manageIsInactiveBg = useThemeColor({preset:"red-accent-high"})
    const manageIsActiveColor = useThemeColor({preset:"red-gray-1"})
    const manageIsActiveBg = useThemeColor({preset:"red-accent-low"})
    const { addCharacter, editCharacter, deleteCharacter , activeCharacter, characters, changeActiveCharacter } = useProfilesSlice()
    const [isEditing, setIsEditing] = useState<false | IsEditingType>(false)

    const router = useRouter()
    const { control, handleSubmit, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(newCharacterSchema),
        defaultValues: {
            "name":"",
            "new-name":""
        }
    })

    const startEditing = ({id, name, index}:IsEditingType) => {
        setIsEditing(prev => ({id, name, index}))
    }
    
    const handleDeleteCharacter = (id:string) => {
        deleteCharacter({id})
    }
    const safeteyAlert = ({id, name}:{id:string, name:string}) => {
        Alert.alert(`Deleting character ${name}`, `Your are attempting to delete the character with name ${(activeCharacter as Character).name}. Are you sure you want to proceed?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => handleDeleteCharacter(id)
            },
        ])
    }

    const onSubmit = data => {
        if(isEditing) {
            console.log("submit", isEditing.id, isEditing.name)
            editCharacter({id:isEditing.id, name:isEditing.name})
            setIsEditing(false)
        } else {
            addCharacter(data)
            //router.push("./(drawer)/(tabs)/")
        }
    }
    return (
        <ThemedView contentContainerStyle={styles.container} scroll={true}>
            <ThemedView style={styles.addForm}>
                <ThemedText type='subtitle' centered={true}>Add a Character</ThemedText>
                <ThemedView style={{flexDirection:"row", marginInline:"auto"}}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value, ref,...rest } }) => (
                            <ThemedTextInput
                                placeholder="Enter name..."
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                style={{maxWidth:null}}
                                {...rest}
                                error={errors["name"] ? errors["name"]:null}
                            />
                        )}
                    />
                    <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                        <Button onPress={handleSubmit(onSubmit)} style={{textAlign:"center"}}>Add</Button>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>

            {isEditing ?
                <ThemedView style={styles.manageForm}>
                    <ThemedText type='subtitle' centered={true}>Edit Character</ThemedText>
                    <ThemedView style={{flexDirection:"row", marginInline:"auto", gap:2, flex:1}}>
                        <TouchableOpacity onPress={() => setIsEditing(false)}>
                            <Button style={{textAlign:"center"}}>Cancel</Button>
                        </TouchableOpacity>
                        <ThemedTextInput autoFocus
                            placeholder="Enter new name..."
                            onChangeText={text => setIsEditing(prev => ({id:(prev as IsEditingType).id, index:(prev as IsEditingType).index, name:text}))}
                            value={isEditing["name"]}
                            style={{width:150}} numberOfLines={1}
                        />
                        <TouchableOpacity onPress={onSubmit}>
                            <Button style={{textAlign:"center"}}>Submit</Button>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView> : null
            }

            <ThemedView style={styles.manageForm}>
                <ThemedText type='subtitle' centered={true}>Manage Characters</ThemedText>
                {characters.map((character, index) => 
                    <ThemedView key={character.id} style={{flexDirection:"row", gap:2, alignItems:"center"}}>
                        <TouchableOpacity onPress={() => changeActiveCharacter({id:character.id})}>
                            <ThemedText type="smallButton" 
                                style={{
                                    backgroundColor:activeCharacter.id === character.id ? manageIsActiveBg:manageIsInactiveBg,
                                    color:activeCharacter.id === character.id ? manageIsActiveColor:undefined,
                                    textDecorationLine:activeCharacter.id === character.id ? undefined:"line-through"
                                }}
                            >
                                Active
                            </ThemedText>
                        </TouchableOpacity>
                        <ThemedText 
                            centered={true} type="smallButton" 
                            style={[styles.characterName, {backgroundColor:manageCharacterNameBg, color:manageCharacterNameColor}]}
                        >
                            {character.name}
                        </ThemedText>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                            <Button small onPress={() => startEditing({id:character.id, name:character.name, index})} style={{textAlign:"center"}}>Edit</Button>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => safeteyAlert({id:character.id, name:character.name})}>
                            <Button small >Delete</Button>
                        </TouchableOpacity>
                    </ThemedView>
                )}
            </ThemedView>
        </ThemedView>
    )
}

export default ManageCharacter