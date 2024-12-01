import { combineReducers } from '@reduxjs/toolkit'
import { themeApi } from '../api/theme'

const rootReducer = combineReducers({
  [themeApi.reducerPath]: themeApi.reducer,
})

export default rootReducer
