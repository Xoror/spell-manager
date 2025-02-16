import { TextInput, type TextInputProps, StyleSheet } from 'react-native'
import { FieldError } from 'react-hook-form'

import useThemeColor from '@/hooks/useThemeColor'
import ThemedView from './ThemedView'
import ThemedText, { baseFontSize}  from './ThemedText'

export type ThemedTextInputProps = TextInputProps & {
    lightColor?: string,
    darkColor?: string,
    error?: FieldError
}

export function ThemedTextInput({
    style,
    lightColor,
    darkColor,
    error,
    ...restProps
}: ThemedTextInputProps) {
    const color = useThemeColor({preset:'red-black'})
    const bg = useThemeColor({preset:'red-gray-3'})
    const placeholderColor = useThemeColor({preset:'red-gray-6'})
    const cursorColor = useThemeColor({preset:"red-accent"})
    const selectionColor= useThemeColor({preset:"red-accent-high"})
    const selectionHandleColor= useThemeColor({preset:"red-accent"})
    const errorColor = useThemeColor({preset:"warning"})
   
    return (
        <ThemedView style={{flexDirection:"column", rowGap:4, justifyContent:"space-around"}}>
            <TextInput
                style={[
                    {...styles.input},
                    { color },
                    {borderColor: "none", backgroundColor:bg},
                    style,
                ]}
                cursorColor={cursorColor}
                placeholderTextColor={placeholderColor}
                selectionColor={selectionColor}
                selectionHandleColor={selectionHandleColor}
                {...restProps}
            />
            {error ? 
                <ThemedText style={{color:errorColor}}>
                    {error.message}
                </ThemedText> : null
            }
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    input: {
        //borderWidth: 1,
        paddingLeft: 12,
        paddingVertical:10,
        minWidth:150,
        maxWidth: 250,
        //flexGrow: 0,
        lineHeight: 18,
        height:"auto",
        marginBlock:"auto"
        //height:42
    }
})
