import { combineReducers } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
// import documentItem from './features/documentItem'

export const rootReducer = combineReducers({
    accountmanage: userSlice,
    // documentitem: documentItem,
})
export type RootState = ReturnType<typeof rootReducer>