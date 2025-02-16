import { schools, tiers, classes } from "@/constants/SpellDetails"

import { type SpellType, type SourceType } from "@/context/profilesSlice"

export type FiltersType = {
    classes: Set<string>,
    tiers: Set<number>,
    schools: Set<string>,
    isRitual: boolean,
    isNotRitual: boolean,
    isConcentration: boolean
    isNotConcentration: boolean
}
export const initialFilter = () => {
    const dnd5e = {
        classes: new Set(classes),
        schools: new Set(schools),
        tiers: new Set(tiers),
        isRitual: true,
        isNotRitual: true,
        isConcentration: true,
        isNotConcentration: true
    }
    return dnd5e
}


type DnDFilterFunctionType = (spell: SpellType, searchInput: string, filters: FiltersType, type?:SourceType) => boolean

export const dndFilter:DnDFilterFunctionType = (spell, searchInput, filters) => {
    let searchInputContains = spell.name.toLowerCase().includes(searchInput.toLowerCase()) ? true:false
    if(searchInput === "") searchInputContains = true
    let isClassFiltered = false
    spell.classes.forEach(spell => {
        if(filters.classes.has(spell.index)) {
            isClassFiltered = true
            return
        }
    })

    const isSchoolFiltered = filters.schools.has(spell.school.name.toLowerCase())
    const isTierFiltered = filters.tiers.has(spell.level)

    const isRitualFiltered = spell.ritual ? filters.isRitual : filters.isNotRitual

    const isConcentrationFiltered = spell.concentration ? filters.isConcentration : filters.isNotConcentration

    return isClassFiltered && searchInputContains && isSchoolFiltered && isTierFiltered && isRitualFiltered && isConcentrationFiltered
}

export const filter:DnDFilterFunctionType = (spell: SpellType, searchInput, filters, type="dnd") => {
    if(type==="dnd") {
        return dndFilter(spell, searchInput, filters)
    }
}

