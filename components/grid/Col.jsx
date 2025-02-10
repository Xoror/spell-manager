
import { StyleSheet } from "react-native";
import { ThemedView as View } from "../ThemedView";

const styles = StyleSheet.create({
    col: {
        flex:1
    }
})

const Col = ({children, style, cols="auto", ...restProps}) => {
    const numCols = cols ? {flex: cols} : {}
    return (
        <View style={{...style, ...styles.col, ...numCols}} {...restProps}>{children}</View>
    )
}

export default Col