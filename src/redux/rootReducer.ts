import { combineReducers } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'

export const rootReducer = combineReducers({
    accountmanage: userSlice,
})
export type RootState = ReturnType<typeof rootReducer>