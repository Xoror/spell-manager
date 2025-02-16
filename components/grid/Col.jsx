
import { StyleSheet } from "react-native"
import ThemedView from "../basic/ThemedView"

const styles = StyleSheet.create({
    col: {
        flex:1
    }
})

const Col = ({children, style, cols="auto", ...restProps}) => {
    const numCols = cols ? {flex: cols} : {}
    return (
        <ThemedView style={{...style, ...styles.col, ...numCols}} {...restProps}>{children}</ThemedView>
    )
}

export default Col