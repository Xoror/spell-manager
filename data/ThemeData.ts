import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveTheme = async (theme) =>  {
    try {
        await AsyncStorage.setItem('sg-spell-manager-theme', theme)
    } catch (error) {
        console.error('Failed to save data to Async Storage!')
        return 0
    }
}

export const loadTheme = async (stateSetter) => {
    try {
        const value = await AsyncStorage.getItem('sg-spell-manager-theme')
        if(value) stateSetter(value)
    } catch (error) {
        console.error('Failed to load data from Async Storage!')
        return 0
    }
}