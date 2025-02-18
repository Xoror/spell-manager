import { createSlice, nanoid, createSelector, current, PayloadAction } from "@reduxjs/toolkit"
import sortAlphabetically from "@/utils/SortAlphabetically"
import spellsSRD from "@/constants/spellsSRD.json"
import spellList from "@/constants/spells.json"

export type SpellType = typeof spellsSRD[0]
export type SourceType = "dnd" | "pathfinder"

type CharacterTemplateProps = {
    name: string,
    slots: {
        "1"?:number,
        "2"?:number,
        "3"?:number,
        "4"?:number,
        "5"?:number,
        "6"?:number,
        "7"?:number,
        "8"?:number,
        "9"?:number,
    }
}
export type Character = {
    id: string,
    name: string,
    spells: Array<SpellType>,//Set<string>,
    slots: Array<Array<boolean>>
}
export type ProfilesState = {
    source: SourceType
    activeCharacter: string,
    characters: Array<Character>,
    defaultSources: Array<string>
}

const characterTemplate = ({name, slots={}}:CharacterTemplateProps) : Character => {
    const parsedSlots = []
    for (let key of Object.keys(slots)) {
        parsedSlots.push(new Array(slots[key as keyof typeof slots]).fill(false))
    }
    return {
        id: nanoid(),
        name: name,
        spells: [],//new Set<string>(),
        slots: []
    }
}

const initialState:ProfilesState = {
    source:"dnd",
    activeCharacter: "none",
    characters: [
        { id: "1", name: "1", spells: [], slots: [] },
        { id: "2", name: "2", spells: [], slots: [] },
        { id: "3", name: "3", spells: [], slots: [] },
        { id: "4", name: "4", spells: [], slots: [] },
        { id: "5", name: "5", spells: [], slots: [] },
        { id: "6", name: "6", spells: [], slots: [] },
        { id: "7", name: "7", spells: [], slots: [] },
        { id: "8", name: "8", spells: [], slots: [] },
        { id: "9", name: "9", spells: [], slots: [] },
        { id: "10", name: "10", spells: [], slots: [] },
        { id: "11", name: "11", spells: [], slots: [] },
        { id: "12", name: "12", spells: [], slots: [] },
        { id: "13", name: "13", spells: [], slots: [] },
        { id: "14", name: "14", spells: [], slots: [] },
        { id: "15", name: "15", spells: [], slots: [] },
        { id: "16", name: "16", spells: [], slots: [] },
        { id: "17", name: "17", spells: [], slots: [] },
        { id: "18", name: "18", spells: [], slots: [] },
        { id: "19", name: "19", spells: [], slots: [] },
        { id: "20", name: "20", spells: [], slots: [] },
    ],
    defaultSources: []
}


export const ProfilesSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {
        changeActiveCharacter(state, action: PayloadAction<{id:string}>) {
            const {id} = action.payload
            if(id === state.activeCharacter) return
            state.activeCharacter = id
        },
        addCharacter(state, action: PayloadAction<CharacterTemplateProps>) {
            const {name} = action.payload
            const nameExists = state.characters.find(character => character.name.toLowerCase() === name.toLowerCase())
            if(nameExists) return
            const newCharacter = characterTemplate(action.payload)
            state.characters.push(newCharacter)
            state.activeCharacter = newCharacter.id
        },
        editCharacter(state, action) {
            const {id, name} = action.payload
            const character = state.characters.find(character => character.id === id)
            if(!character) return
            character.name = name === "" ? "Don't enter no name ;)" : name
        },
        deleteCharacter(state, action: PayloadAction<{id:string}>) {
            const {id} = action.payload
            state.characters = state.characters.filter(character => character.id != id)
            if(state.characters.length === 0) {
                state.activeCharacter = "none"
                return
            }
            if(state.activeCharacter === id && state.characters.length != 0) {
                state.activeCharacter = state.characters[0].id
            }
        },
        addSpell(state, action) {
            const { id, spell } = action.payload
            const character = state.characters.find(character => character.id === id)
            const hasSpell = character.spells.find(spellInt => spellInt.id === spell.id)
            
            if(!character || hasSpell) return

            character.spells.push(spell)
            character.spells.sort((a,b) => sortAlphabetically(a.name,b.name))
        },
        deleteSpell(state, action) {
            const { id, spellId } = action.payload
            
            const character = state.characters.find(character => character.id === id)
            if(!character) return

            character.spells = character.spells.filter(spell => spell.id != spellId)
        },
        editSpellSlots(state, action) {
            const {id, tier, number} = action.payload
            const character = state.characters.find(character => character.id === id)
            if(!character) return

            let slots = character.slots[tier]
            const currentNumber = slots.length

            if(currentNumber === number) return
            else if(currentNumber > number) slots = slots.slice(0, number+1)
            else {
                const difference = number - currentNumber
                for (let i=0; i++; i<difference) {
                    slots.push(false)
                }
            }
        }
        /*
        importNotebook(state, action) {
            let keys1 = Object.keys(state)
            keys1.forEach(key => 
                state[key] = action.payload[key]
            )
        }
            */
    }/*,
    extraReducers(builder) {
        builder
            .addCase(importCharacterNames.pending, (state, action) => {
                state.characters.status = "pending"
            })
    }*/
})

const profilesReducer = ProfilesSlice.reducer

export default profilesReducer
export const { addCharacter, deleteCharacter, addSpell, deleteSpell, editSpellSlots
} = ProfilesSlice.actions

export const getActiveCharacter = createSelector(
    [
      // Usual first input - extract value from `state`
      state => state.profiles,
    ],
    // Output selector gets (`items, category)` as args
    (state) => {
        console.log("selector", state.activeCharacter)
        return state.characters.find((character: Character) => character.id === state.activeCharacter) ?? "none"
    }
)

/*
export const selectNodesById = createSelector(
    [
      // Usual first input - extract value from `state`
      state => state.notebook,
      // Take the second arg, `category`, and forward to the output selector
      (state, objects) => objects
    ],
    // Output selector gets (`items, category)` as args
    (state, objects) => {
        const returnArray = []
        for ( let object of objects) {
            const child = findChildById(state, object.toColumnId, object.toId)
            returnArray.push({id:child.id, columnId:object.toColumnId, label:child.label, description:object.description})
        }
        return returnArray
    }
)


export const getListOfNodes = createSelector(
    [
      // Usual first input - extract value from `state`
      state => state.notebook,
      // Take the second arg, `category`, and forward to the output selector
      ( state ) => state
    ],
    // Output selector gets (`items, category)` as args
    ( state ) => {
        const chapter = state.chapters.find(chapter => chapter.id === state.selectedChapter)
        const selectedElementId = state.selectedElement.id
        
        const returnArray = []
        for( let column of chapter.data) {
            //console.log(column.children)
            returnArray.push(
                {
                    label: column.label,
                    id: column.id,
                    nodes: getChildNodesRecursive(column.children, [], selectedElementId)
                }
            )
        }

        return returnArray
    }
)
*/
