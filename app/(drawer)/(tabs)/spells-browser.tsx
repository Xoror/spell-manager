import React, { useCallback, useMemo, useState } from "react"
import { FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native"

import useProfilesSlice from "@/context/useProfilesSlice"
import { type SpellType as SpellTypeSRD } from "@/context/profilesSlice"

import Button from "@/components/basic/Button"
import ThemedText  from "@/components/basic/ThemedText"
import ThemedView from "@/components/basic/ThemedView"
import { Collapsible, CollapsibleHeader, CollapsibleItem } from "@/components/collapsible/"
import Header from "@/components/basic/Header"
import { ThemedTextInput } from "@/components/basic/ThemedTextInput"
import FilterTiers from "../../(modals)/filter-tiers"

import spellsSRD from "@/constants/spellsSRD.json"
import spellsPf from "@/constants/pathfinder-spells/tier-1.json"
import { tiers, classes, schools } from "@/constants/SpellDetails"
import useThemeColor from "@/hooks/useThemeColor"
import { debounce } from "lodash"

import { FiltersType, initialFilter, filter } from "@/utils/FilterFunctions"
import Accordion from 'react-native-collapsible/Accordion';

const initialF = {
    classes: new Set(classes),
    schools: new Set(schools),
    tiers: new Set(tiers),
    isRitual: true,
    isNotRitual: true,
    isConcentration: true,
    isNotConcentration: true
}

const styles = StyleSheet.create({
    collapseHeader: {
        paddingInline: 16,
        paddingBlock: 8,
        borderBottomWidth: 1,
        //backgroundColor: "#212529",
        //color: "white",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        position:"sticky",
    },
    stickyCollapseHeader: {
        position: "sticky",
        top: 16
    },
    collapseContainer: {
        //backgroundColor: "color-mix(in oklab, #212529, white 10%)",
        //color: "white"
    },
    listItem: {
        flexDirection: "row"
    },
    zeroHeight: {
        height: 0
    },
    addButton: {
        borderRightWidth: 1,
        paddingBlock: 6,
        paddingInline: 6,
    }
})
const spell = spellsPf[0]["_source"]
type SpellType = SpellTypeSRD | typeof spell

const SpellBrowser = ({spellList}:{spellList?:Array<SpellType>}) => {    
    const { activeCharacter, addSpell, deleteSpell, source } = useProfilesSlice()
    const [isOpen, setIsOpen] = useState(new Set([]))
    const [searchInput, setSearchInput] = useState("")
    const [filters, setFilters] = useState<FiltersType>(initialF)
    const [openModal, setOpenModal] = useState("none")


    const [forceRerender, setForceRerender] = useState(activeCharacter==="none" ? 0 : activeCharacter.spells.length)
    if(activeCharacter != "none" && activeCharacter.spells.length != forceRerender) {
        //setForceRerender(activeCharacter.spells.length)
    }

    const spells = spellList ?? spellsPf.map(spell => spell["_source"])
    const isAdding = spellList ? false : true

    const handleModifySpell = (spell: SpellType) => {
        if(activeCharacter === "none") return

        if(isAdding) { addSpell({id:activeCharacter.id, spell}) }
        else { deleteSpell({id:activeCharacter.id, spellId: spell.id}) }
    }
    const handlePress = (index:number) => {
        //console.log(isOpen.has(index))
        setIsOpen((prev:any) => {
            if(prev.has(index)) prev.delete(index)
            else prev.add(index)
            return new Set([...prev])
        })
    }

    const debaouncedSearchInput = debounce((value) => {
        setSearchInput(value)
        if(value === "") {
            setIsOpen(prev => new Set([]))
            return
        }
        setIsOpen(prev => new Set([0,1,2,3,4,5,6,7,8,9]))
    }, 250)
    const handleSearchInput = (value) => {
        debaouncedSearchInput(value)
    }

    const isKnown = (spell: SpellType) => {
        if(activeCharacter === "none") return

        if(isAdding) return activeCharacter.spells.find(spellKnown => spellKnown.id === spell.id)
        return !activeCharacter.spells.find(spellKnown => spellKnown.id === spell.id)
    }

    const spellsFiltered = useMemo(() => {
        console.log("filtering")
        return tiers.map(tier => {
            let isFilteredValue = false
            return (
                {
                    title: "Tier "+tier, 
                    data:spells.filter(spell => {
                        isFilteredValue = true// filter(spell, searchInput, filters, source)
                        if(!isKnown(spell)) //console.log("test")
                        return spell.level === tier && !isKnown(spell) && isFilteredValue
                    }),
                }
            )
        })
    }, [activeCharacter, searchInput, filters])
    const renderSpellList = useMemo(() => {
        return spellsFiltered.map(tier => {
            return {title:tier.title, data:tier.data.map(spell => 
                <CollapsibleItem 
                    key={spell.id} isAdding={isAdding}
                    spell={spell as any} containerStyle={styles.listItem} 
                    onIconPress={() => handleModifySpell(spell)}
                />
            )}
        })
    }, [])
    
    return (
        <>
            <FilterTiers filters={filters} setFilters={setFilters} animationType="slide" onClose={() => setOpenModal("close")} visible={openModal==="tiers"}/>
            <ThemedView style={{flex:1}}>
                <Header style={isAdding ? null:{justifyContent:"space-between"}}>
                    {isAdding ? <ThemedText type="subtitle" centered={true} style={{flexGrow: 1}}>Spell Browser</ThemedText> : null}
                    <ThemedTextInput placeholder="Search spells..." style={{flexGrow: 0}} onChangeText={handleSearchInput}/>
                    <TouchableOpacity onPress={() => setOpenModal("tiers")}>
                        <Button>
                            Filter
                        </Button>
                    </TouchableOpacity>
                </Header>
                < >
                    {true ? 
                        <Accordion
                            activeSections={Array.from(isOpen)} touchableComponent={Pressable}
                            initialNumToRender={10} maxToRenderPerBatch={15}
                            sections={spellsFiltered.map(spells => ({title:spells.title, content:spells.data}))}
                            renderHeader={(section) => {
                                if(!isAdding && section.content.length === 0) return
                                return (
                                    <CollapsibleHeader isVisible={true} containerStyle={styles.collapseHeader} >
                                        {(section.title === "Tier 0" ? "Cantrips":section.title)+" ("+section.content.length+")" }
                                    </CollapsibleHeader>
                                )
                            }}
                            renderContent={ (section) => {
                                const tier = renderSpellList.find(tier => section.title === tier.title)
                                return <>{tier.data}</>
                            }}
                            onChange={(activeSections) => setIsOpen(new Set(activeSections))}
                            renderAsFlatList={true}
                        /> : null
                    }
                    {false ? spellsFiltered.map(({title, data}, index) => 
                        <Collapsible
                            isOpen={isOpen} setIsOpen={setIsOpen}
                            index={index} key={title}
                            data={data} title={title}
                            renderList={ ({spell}) => {
                                return (
                                    <CollapsibleItem 
                                        key={spell.id} isAdding={isAdding}
                                        spell={spell} containerStyle={styles.listItem} 
                                        onIconPress={() => handleModifySpell(spell)}
                                    />
                                )
                            }}
                            renderTitle={({title, data, isVisible}) => {
                                if(!isAdding && data.length === 0) return
                                return (
                                    <CollapsibleHeader isVisible={isVisible} containerStyle={styles.collapseHeader} >
                                        {(title === "Tier 0" ? "Cantrips":title)+" ("+data.length+")" }
                                    </CollapsibleHeader>
                                )
                            }}
                        />
                    ):
                    null}
                </>
            </ThemedView>
        </>
    )
}

export default SpellBrowser