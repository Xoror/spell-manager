import { act, ReactNode } from "react"
import { combineReducers } from 'redux'
import { Provider, useDispatch, useSelector, useStore } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import AsyncStorage from '@react-native-async-storage/async-storage'

import profilesReducer from "./profilesSlice"

import { debounce } from "lodash"

const appReducer = combineReducers({
    profiles: profilesReducer
})

type ReducerTypes = Parameters<typeof appReducer>
const rootReducer = (state: ReducerTypes[0], action: ReducerTypes[1]) => {
	if(action.type === 'import/state' || action.type === "import/initial") {
        const state = action.payload as ReducerTypes[0]
		return appReducer(state, action)
    }
	return appReducer(state, action)
}


const saveState = async (state:any) => {
    try {
        const jsonValue = JSON.stringify(state)
        await AsyncStorage.setItem('sg-spell-manager', jsonValue)
    } catch (error) {
        console.error('Failed to save data to Async Storage:', error)
        return 0
    }
}

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()/*.concat(statblockApiSlice.middleware)*/
})

const initialImport = (state: RootState) => {
    return {
        type: "import/initial",
        payload: state
    }
}
const loadFromAsyncStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('sg-spell-manager')
        return value ? JSON.parse(value) : undefined
    } catch (error) {
        console.error('Failed to load data from Async Storage:', error)
        return 0
    }
}
const initializeStore = async () => {
    const initialState = await loadFromAsyncStorage()
    if(initialState) store.dispatch(initialImport(initialState))
}
initializeStore()

const StoreProvider = ({ children }: { children: ReactNode }) => {
    
	store.subscribe(
		// we use debounce to save the state once each 800ms
		// for better performances in case multiple changes occur in a short time
		debounce(() => {
            saveState(store.getState())
		}, 800)
	)
    

	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
}
export default StoreProvider

// Infer the type of store
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()