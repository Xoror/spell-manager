import React, { useMemo, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"

import useProfilesSlice from "@/context/useProfilesSlice"
import { type SpellType } from "@/context/profilesSlice"

import Button from "@/components/basic/Button"
import ThemedText  from "@/components/basic/ThemedText"
import ThemedView from "@/components/basic/ThemedView"
import { Collapsible, CollapsibleHeader, CollapsibleItem } from "@/components/collapsible/"
import Header from "@/components/basic/Header"
import { ThemedTextInput } from "@/components/basic/ThemedTextInput"
import FilterTiers from "../../(modals)/filter-tiers"

import spellsSRD from "@/constants/spellsSRD.json"
import { tiers } from "@/constants/SpellDetails"
import useThemeColor from "@/hooks/useThemeColor"
import { debounce } from "lodash"

import { FiltersType, initialFilter, filter } from "@/utils/FilterFunctions"

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

const SpellBrowser = ({spellList}:{spellList?:Array<SpellType>}) => {    
    const { activeCharacter, addSpell, deleteSpell, source } = useProfilesSlice()
    const [isOpen, setIsOpen] = useState(new Set([]))
    const [searchInput, setSearchInput] = useState("")
    const [filters, setFilters] = useState<FiltersType>(() =>initialFilter())
    const [openModal, setOpenModal] = useState("none")


    const [forceRerender, setForceRerender] = useState(activeCharacter==="none" ? 0 : activeCharacter.spells.length)
    if(activeCharacter != "none" && activeCharacter.spells.length != forceRerender) {
        //setForceRerender(activeCharacter.spells.length)
    }

    const spells = spellList ?? spellsSRD
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

    const spellsFiltered = useMemo(() => tiers.map(tier => {
        let isFilteredValue = false
        return (
            {
                title: "Tier "+tier, 
                data:spells.filter(spell => {
                    isFilteredValue = filter(spell, searchInput, filters, source)
                    if(!isKnown(spell)) //console.log("test")
                    return spell.level === tier && !isKnown(spell) && isFilteredValue
                }),
            }
        )
    }), [activeCharacter, searchInput, filters])
    
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
                <ThemedView scroll={true}>
                    {spellsFiltered.map(({title, data}, index) => 
                        <Collapsible
                            isOpen={isOpen} setIsOpen={setIsOpen}
                            index={index} key={title}
                            data={data} title={title}
                            renderList={ ({title, spell}) => {
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
                    )}
                </ThemedView>
            </ThemedView>
        </>
    )
}

export default SpellBrowser