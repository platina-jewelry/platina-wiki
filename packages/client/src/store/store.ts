import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import { themeApi } from '../api/theme'

const preloadedState = window?.___REDUX_STATE___ || {}
delete window.___REDUX_STATE___

const middlewares = [themeApi.middleware]

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(...middlewares),
  preloadedState: preloadedState
})

export type AppDispatch = typeof store.dispatch;

export default store
