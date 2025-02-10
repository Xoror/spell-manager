
import { StyleSheet } from "react-native";
import { ThemedView as View } from "../ThemedView";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

const Row = ({children, style, ...restProps}) => {
    return (
        <View style={{...style, ...styles.row}}>{children}</View>
    )
}

export default Row