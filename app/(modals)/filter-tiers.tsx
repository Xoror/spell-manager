import React, { useMemo, useState } from "react"
import { StyleSheet, TouchableOpacity, ScrollView, Modal, type ModalProps, View } from "react-native"
import { Link } from "expo-router"

import { schools, tiers, classes } from "@/constants/SpellDetails"

import ThemedCheckbox from "@/components/basic/ThemedCheckbox"
import ThemedText, { ThemedTextProps} from "@/components/basic/ThemedText"
import ThemedView, { ThemedViewProps } from "@/components/basic/ThemedView"
import Button from "@/components/basic/Button"

import { FiltersType } from "@/utils/FilterFunctions"
import useThemeColor from "@/hooks/useThemeColor"
import { useColorScheme } from "@/hooks/useColorScheme"

type FilterTiersType = {
    onClose?: any,
    onApply?: any,
    filters?:FiltersType,
    setFilters?:React.Dispatch<React.SetStateAction<FiltersType>>
} & ModalProps

const styles = StyleSheet.create({
    backdrop: {
        width:"100%",
        height:"100%",
        backgroundColor: 'rgba(0, 0, 0, 0.69)',
    },
    modal: {
        width: "85%",
        height: "85%",
        marginBlock: "auto",
        alignSelf: "center",
        //justifyContent:"space-between"
    },
    title: {
        paddingTop: 12,
    },
    row: {
        flexWrap:"wrap",
        flexDirection: "row",
        alignSelf: "center",
        width: "75%",
        position:"relative",
        rowGap:10
    },
    col: {
        gap: 10
    },
    ritual: {
        width: "50%",
    },
    filterLabel: {
        width: "100%",
        marginTop: 8,
    },
    filter: {
        flexDirection: "row",
        alignItems:"center",
        gap: 8,
        width:"50%"
    },
    controls: {
        width: "100%",
        flexDirection: "row",
        justifyContent:"space-evenly",
        marginTop: 8
    },
    button:{
    },
    checkbox: {
        height: 24,
        width:24
    }
})

const Row = ({children, ...restProps} : (ThemedViewProps)) => {
    return (
        <ThemedView style={styles.row} {...restProps}>
            {children}
        </ThemedView>
    )
}
const Column = ({children, width="50%", style, centered,...restProps} : (ThemedViewProps & {width?: any, centered?:boolean}) ) => {
    return (
        <ThemedView style={[styles.col, {width}, centered ? {justifyContent:"center"}:null, style]} {...restProps}>
            {children}
        </ThemedView>
    )
}
const FilterHeader = ({children, style, centered=true, ...restProps}:ThemedTextProps) => {
    return(
        <ThemedText style={styles.filterLabel} centered={centered} {...restProps}>
            {children}
        </ThemedText>
    )
}


const FilterTiers = ({style, onClose, onApply, filters, setFilters,...restProps}:FilterTiersType) => {
    const titleBgColor = useThemeColor({preset:"red-gray-5"}).toString()
    const theme = useColorScheme()

    const handleChangeFilter = (value:boolean, entry: string | number, type:string ) => {
        setFilters(prev => {
            let data = prev[type]
            if(data instanceof Set) {
                const hasTier = data.has(entry)
                if(hasTier) data.delete(entry)
                else data.add(entry)
            } else if(typeof data === "boolean") {
                data = !value
            }
            return {...prev, [type]:data}
        })
    }
    return(
        <Modal transparent={true} onRequestClose={onClose} {...restProps}>
            <View style={styles.backdrop}>
                <ThemedView style={styles.modal}>
                    <ThemedText type="subtitle" centered={true} style={[styles.title, {backgroundColor:titleBgColor}]}>
                        Filter Spell Tiers
                    </ThemedText>
                    <ScrollView fadingEdgeLength={128} persistentScrollbar indicatorStyle={theme === "dark" ? "white":"black"}>
                        <Row>
                            <FilterHeader>Classes</FilterHeader>
                            {classes.map(_class => 
                                <ThemedView key={_class} style={[styles.filter]}>
                                    <ThemedCheckbox 
                                        size={styles.checkbox.height} useBuiltInState={false} disableText 
                                        onPress={(value) => handleChangeFilter(value, _class, "classes")} 
                                        isChecked={filters.classes.has(_class)} 
                                    />
                                    <ThemedText>{_class}</ThemedText>
                                </ThemedView>
                            )}
                        </Row>
                        <Row>
                            <FilterHeader>Spell Tier</FilterHeader>
                            {tiers.map(tier => 
                                <ThemedView key={tier} style={[styles.filter, {justifyContent:"center"}]}>
                                    <ThemedCheckbox 
                                        size={styles.checkbox.height} useBuiltInState={false} disableText 
                                        onPress={(value) => handleChangeFilter(value, tier, "tiers")} 
                                        isChecked={filters.tiers.has(tier)} 
                                    />
                                    <ThemedText>Tier {tier}</ThemedText>
                                </ThemedView>
                            )}
                        </Row>
                        <Row>
                            <FilterHeader>Spell School</FilterHeader>
                            {schools.map(school => 
                                <ThemedView key={school} style={styles.filter}>
                                    <ThemedCheckbox 
                                        size={styles.checkbox.height} useBuiltInState={false} disableText 
                                        onPress={(value) => handleChangeFilter(value, school, "schools")} 
                                        isChecked={filters.schools.has(school)}  
                                    />
                                    <ThemedText>{school}</ThemedText>
                                </ThemedView>
                            )}
                        </Row>
                        <Row>
                            <Column width="100%">
                                <FilterHeader>Can be cast as Ritual</FilterHeader>
                            </Column>
                            <Column style={[styles.filter]} centered>
                                <ThemedCheckbox 
                                    size={styles.checkbox.height} useBuiltInState={false} disableText 
                                    onPress={(value) => handleChangeFilter(value, "yes", "isRitual")} isChecked={filters.isRitual} />
                                <ThemedText>Yes</ThemedText>
                            </Column>
                            <Column style={[styles.filter]} centered>
                                <ThemedCheckbox 
                                    size={styles.checkbox.height} useBuiltInState={false} disableText 
                                    onPress={(value) => handleChangeFilter(value, "no", "isNotRitual")} isChecked={filters.isNotRitual} />
                                <ThemedText>No</ThemedText>
                            </Column>
                        </Row>
                        <Row>
                            <Column width="100%">
                                <FilterHeader>Requires Concentration</FilterHeader>
                            </Column>
                            <Column style={[styles.filter]} centered>
                                <ThemedCheckbox 
                                    size={styles.checkbox.height} useBuiltInState={false} disableText 
                                    onPress={(value) => handleChangeFilter(value, "yes", "isConcentration")} isChecked={filters.isConcentration} />
                                <ThemedText>Yes</ThemedText>
                            </Column>
                            <Column style={[styles.filter]} centered>
                                <ThemedCheckbox 
                                    size={styles.checkbox.height} useBuiltInState={false} disableText 
                                    onPress={(value) => handleChangeFilter(value, "no", "isNotConcentration")} isChecked={filters.isNotConcentration} />
                                <ThemedText>No</ThemedText>
                            </Column>
                        </Row>
                    </ScrollView>
                    <TouchableOpacity onPress={onClose}>
                        <Button centered>Dismiss</Button>
                    </TouchableOpacity>
                </ThemedView>
            </View>
        </Modal>
    )
}

export default FilterTiers