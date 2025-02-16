
import { StyleSheet } from "react-native"
import ThemedView from "../basic/ThemedView"

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBlock: 4
    }
})

const Row = ({children, style, ...restopsProps}) => {
    return (
        <ThemedView style={{...style, ...styles.row}} {...restopsProps} >{children}</ThemedView>
    )
}

export default Row