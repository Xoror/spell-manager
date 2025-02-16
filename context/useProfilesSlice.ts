import { ProfilesSlice, getActiveCharacter, type Character, type SourceType } from "./profilesSlice"

import { Slice as RTKSlice } from "@reduxjs/toolkit" 
import { useDispatch, useSelector } from "react-redux" 
import { RootState } from "./store"
 
type StorePropertyNames = keyof RootState 
 
type StoreData<StorePropertyName extends StorePropertyNames> = { 
    [K in StorePropertyName]: RootState[K] 
}
 
type WrappedSliceMethods<Slice extends RTKSlice> = { 
    [ActionName in keyof Slice["actions"]]: ( 
        ...args: Parameters<Slice["actions"][ActionName]> 
    ) => void 
}

const useSliceWrapper = < 
    Slice extends RTKSlice, 
    Name extends StorePropertyNames 
>( 
    slice: Slice, 
    storePropertyName: Name 
): WrappedSliceMethods<Slice> & StoreData<Name> & {activeCharacter: Character | "none", characters: Character[], source: SourceType} => { 
    const dispatch = useDispatch() 
    const { actions } = slice 
    
    const data = useSelector<RootState, RootState[Name]>( 
        (state) => state[storePropertyName] 
    )
    const activeCharacter:(Character |"none")= useSelector((state:any) => getActiveCharacter(state))//useSelector((state:any) => {return state.profiles.characters.find((character: Character) => character.id === state.profiles.activeCharacter) ?? "none"})
    const source:(SourceType) = useSelector((state:any) => state.profiles.source)
    const characters:(Character[]) = useSelector((state:any) => state.profiles.characters)
    const dataOutput = { [storePropertyName]: data } as StoreData<Name> 
    
    const methods = Object.keys(actions).reduce((acc, k) => { 
        const key = k as keyof typeof actions 
        type Method = Slice["actions"][typeof key] 
    
        if (actions[key]) { 
            return { 
                ...acc, 
                [key]: (input: Parameters<Method>) => { 
                    dispatch(actions[key](input)) 
                } 
            } 
        } 
        return acc 
    }, {} as WrappedSliceMethods<Slice>) 
    //console.log(methods)
    return { ...methods, ...dataOutput, activeCharacter, characters, source } 
}

const useProfilesSlice = () => useSliceWrapper(ProfilesSlice, "profiles")
export default useProfilesSlice
