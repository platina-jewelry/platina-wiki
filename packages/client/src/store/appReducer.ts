import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Определение начального состояния приложения
interface IAppState {
  user: null | object // Замените `object` на реальный тип пользователя, если потребуется
  errorMessage: string | null
  theme: string // Например, строковое значение для темы
}

// Начальное состояние
const initialState: IAppState = {
  user: null,
  errorMessage: null,
  theme: 'light', // Или любое другое значение по умолчанию
}

// Создание slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
  },
})

// Экспорт действий
export const { setTheme } = appSlice.actions

// Экспорт редьюсера
export default appSlice.reducer
