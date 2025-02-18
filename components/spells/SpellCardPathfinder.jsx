import React, { useState } from "react"

import { Pressable, StyleSheet, TouchableOpacity } from "react-native"
import ThemedText from "../basic/ThemedText"
import ThemedView, { default as View } from "../basic/ThemedView"
import Row from "../grid/Row"
import Col from "../grid/Col"

const styles = StyleSheet.create({
    spellcard: {
        paddingInline: 12,
    },
    row: {
        borderBottomColor: "white",
        borderBottomWidth: 1
    }
})

const Bold = ({children}) => {
    return(
        <ThemedText type="defaultSemiBold">{children}</ThemedText>
    )
}

export const SpellCardPathfinder = (props) => {
    const [showHeightened, setShowHeightened] = useState(false)
    const [opacity, setOpacity] = useState(1)
    const { data } = props
    const parseComponents = (components) => {
        return components.map(component => component[0].toUpperCase()).join(", ")
    }
    const { 
        actions, area_raw, bloodline, category, component, deity, domain, duration_raw,
        heighten, heighten_group, heighten_level, level, name, patron_theme, remaster_name, 
        pfs, range_raw, rarity, resistance, school, skill_mod, speed, spell_type, summary, 
        target, text:description, tradition, trait, trait_raw, trait_group, trigger, type
    } = data
    return (<ThemedView style={{...styles.spellcard, ...props.style }}>
        <Row style={styles.row}>
            <Col>
                <ThemedText>
                    <Bold>Remastered Name: </Bold>{remaster_name}
                </ThemedText>
                <ThemedView style={{flexDirection: "row", gap: 6}}>
                    {trait_raw.map(trait => 
                        <ThemedText key={trait} type="default">{trait}</ThemedText>
                    )}
                </ThemedView>
            </Col>
        </Row>
        <Row style={styles.row}>
            <Col>
                <ThemedText>
                    <Bold>Tradition: </Bold>{tradition.join(", ")}
                </ThemedText>
            </Col>
        </Row>
        <Row style={styles.row}>
            <Col>
                <ThemedText>
                    <Bold>Casting Time: </Bold>{actions}
                </ThemedText>
                <ThemedText>
                    <Bold>Range: </Bold>{area_raw ?? range_raw}
                </ThemedText>
            </Col>
            <Col>
                <ThemedText>
                    <Bold>Components: </Bold>{parseComponents(component)}
                </ThemedText>
                <ThemedText>
                    <Bold>Duration: </Bold>{duration_raw ?? "Instantaneous"}
                </ThemedText>
            </Col>
        </Row>
        <Row style={styles.row}>
            <Col>
                <ThemedText>
                    <Bold>Deities: </Bold>{deity ? deity.join(", "):"-"}
                </ThemedText>
                <ThemedText>
                    <Bold>Patron Theme: </Bold>{patron_theme ? patron_theme.join(", "):"-"}
                </ThemedText>
            </Col>
            <Col>
                <ThemedText>
                    <Bold>Domain: </Bold>{domain ? domain.join(", "): "-"}
                </ThemedText>
                <ThemedText>
                    <Bold>Bloodline: </Bold>{bloodline ? bloodline.join(", "):"-"}
                </ThemedText>
            </Col>
        </Row>
        <Row style={styles.row}>

        </Row>
        <Row style={styles.row}>

        </Row>
        <Row style={{...styles.row, flex: -1}}>
            <Col scroll={true} >
                <ThemedText style={{textAlign:"justify"}}>
                    {description.split(" --- ")[1]}
                </ThemedText>
            </Col>
        </Row>
        <Row style={{...styles.row, flex: -1}}>
            <Col scroll={true} >
                <Pressable 
                    onPress={() => setShowHeightened(prev => !prev)} 
                    android_ripple={{color:"rgba(0,0,0,0.3)"}}
                >
                    <ThemedText>
                        {showHeightened ? <Bold>Hide Heightened</Bold>: <Bold>Show Heightened</Bold>}
                    </ThemedText>
                    {showHeightened ? 
                        <ThemedText style={{textAlign:"justify"}}>
                            {description.split(" --- ")[2]}
                        </ThemedText>
                        :
                        <ThemedText>
                            (...)
                        </ThemedText>
                    }
                </Pressable>
            </Col>
        </Row>
        <Row style={styles.row}>
            <ThemedText className="spellcard-footer">Level {level} {school} spell </ThemedText>
        </Row>
    </ThemedView>)
}

export default SpellCardPathfinder