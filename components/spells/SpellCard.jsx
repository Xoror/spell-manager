import React from "react"

import { StyleSheet } from "react-native"
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

/*
    Required Inputs: 
    - A string as "id", which should uniquely identify any given certain card
    - The details of the spell can be inserted with either
        - a JSON object as "data" containing
            - A string as "name", which is what the spell is called
            - A string as "castingTime", which is the time it takes to cast the spell
            - A boolean as "ritual", which specifies if the spell can be cast as a ritual
            - A string as "range", which gives the range up to which the spell can be cast
            - A string as "duration", which specifies how long the spell is active (instantenous in case it's a shoot and forget like
              firebolt)
            - A string as "type", which specifies the spell tier (it goes Cantrip, 1st, ..., 9th in DnD 5e)
            - An object as "description", which takes two different forms for either:
                - If the type is "Cantrip", the description should be an array of arrays of strings, where only the first
                  array counts (the rest can be empty arrays, 1 is enough). The first array will have two entries: the first is the description
                  and the second is the change of effects at higher levels, written out as a sentence.
                - If the type is tier 1 or higher, the description is an array of strings, the first entry being the description and the second
                  the change of effects at higher levels, written out as a sentence.
            - A string gas "school", which specifies the spell school that the spell is from
            - An array of strigns as "classes", which contains all the classes that can learn the spell
            - An array of strings as "components", which describe the components needed to cast the spell, as in Vocal ("V"), Soamtic ("S"), Material ("M")
        or each data point as its own variable, with the same restrictions and labels as above
            
    Optional Inputs
    - A string as "show", which can be used to show/hide the vard via a CSS class   
*/

export const SpellCard = (props) => {
    let data
    if(props.data === undefined) {
        data = {
            name: props.name, 
            range: props.range, 
            type: props.type, 
            description: props.description,
            school: props.school, 
            ritual: props.ritual, 
            classes: props.classes, 
            components: props.components,
            duration: props.duration, 
            castingTime: props.castingTime
        }
    }
    else {
        data = props.data
    }
    let classes = ""
    for(let i=0; i<data.classes.length; i++) {
        if(i === data.classes.length - 1) {
            classes += `${data.classes[i].name}`
        } else {
            classes += `${data.classes[i].name}, `
        }
    }
    let components = ""
    for(let i=0; i<data.components.length; i++) {
        if(i === data.components.length - 1) {
            components += `${data.components[i]}`
        } else {
            components += `${data.components[i]}, `
        }
    }
    return(
        <ThemedView style={{...styles.spellcard, ...props.style }}>
            <Row style={styles.row}>
                {false ? <ThemedText className="h4">{data.name} </ThemedText> : null}
                <ThemedText type="defaultSemiBold">Classes: {classes}  </ThemedText>
            </Row>
            <Row style={styles.row}>
                <Col>
                    <ThemedText type="defaultSemiBold">
                        Casting Time: 
                     </ThemedText>
                </Col>
                <Col md="auto">
                    <ThemedText>
                        {data.castingTime}{data.ritual ? " or Ritual": ""}
                     </ThemedText>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col>
                    <ThemedText type="defaultSemiBold">
                        Range: 
                     </ThemedText>
                </Col>
                <Col md="auto">
                    <ThemedText>
                        {data.range}
                     </ThemedText>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col>
                    <ThemedText type="defaultSemiBold">
                        Components: 
                     </ThemedText>
                </Col>
                <Col md="auto">
                    <ThemedText>
                        {components}
                     </ThemedText>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col>
                    <ThemedText type="defaultSemiBold">
                        Duration:
                     </ThemedText>
                </Col>
                <Col md="auto">
                    <ThemedText>
                        {data.duration[0]}{data.duration[1] ? " (Concentration)" : null}
                     </ThemedText>
                </Col>
            </Row>
            <Row style={{...styles.row, flex: -1}}>
                <Col scroll={true} >
                    {data.description[0].map((desc, index) => (
                        <ThemedText key={`${data.name}-spellcard-description-${index}`} style={{textAlign:"justify"}}>
                            {index === 0 ? <ThemedText type="defaultSemiBold">Description:  </ThemedText>: null}{desc}
                         </ThemedText>
                    ))}
                </Col>
            </Row>
            <Row style={styles.row}>
                <ThemedText style={{textAlign:"justify", width:"100%"}}>
                    <ThemedText type="defaultSemiBold">At higher levels: </ThemedText> {data.description[1]}
                 </ThemedText>
            </Row>
            <Row style={styles.row}>
                <ThemedText className="spellcard-footer">{data.type} level {data.school} spell </ThemedText>
            </Row>
         </ThemedView>
    )
}

/*
<div className="collapse" >
    <TbArrowBigRightFilled color="black" size="24px" style={{position:"absolute", zIndex:"3"}}/>
</div>
*/