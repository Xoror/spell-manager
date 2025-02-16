import { TextInput, StyleSheet, Pressable } from 'react-native'
import { useRouter } from "expo-router"

import ThemedView from "@/components/basic/ThemedView"
import ThemedText from "@/components/basic/ThemedText"
import { ThemedTextInput } from "@/components/basic/ThemedTextInput"
import Button from "@/components/basic/Button"

import useProfilesSlice from '@/context/useProfilesSlice'

import { useForm, Controller, FieldError } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const styles = StyleSheet.create({
    container: {
        height:"70%",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        gap: 24,
        width: "60%",
        justifyContent:"center"
    }
})

const newCharacterSchema = z.object({
    name: z.string().min(1, "Has to be at least 1 character long!")
})

const AddCharacter = () => {
    const { addCharacter } = useProfilesSlice()
    const router = useRouter()
    const { control, handleSubmit, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(newCharacterSchema),
        defaultValues: {
            "name":""
        }
    })

    const onSubmit = data => {
        addCharacter(data)
        router.push("/(tabs)/")
    }
    return (
        <ThemedView contentContainerStyle={styles.container} scroll={true}>
            <ThemedView style={styles.form}>
                <ThemedText type='title' centered={true}>Add a Character</ThemedText>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value, ref,...rest } }) => (
                        <ThemedTextInput
                            placeholder="Enter name..."
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{maxWidth:"none"}}
                            {...rest}
                            error={errors["name"] ? errors["name"]:null}
                        />
                    )}
                />
                <Pressable onPress={handleSubmit(onSubmit)}>
                    <Button onPress={handleSubmit(onSubmit)} style={{textAlign:"center"}}>Add</Button>
                </Pressable>
            </ThemedView>
        </ThemedView>
    )
}

export default AddCharacter