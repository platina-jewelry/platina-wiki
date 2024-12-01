import { Reducer } from '@reduxjs/toolkit'
import { EThemes } from '../types/EThemes'

export interface IUserState {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  avatar: string | null
  email: string
  phone: string
}

export interface IAppState {
  user: IUserState | null
  errorMessage: string | null
  theme: EThemes
}

export interface IRootState {
  app: IAppState
  authApi: ReturnType<Reducer>
  oauthApi: ReturnType<Reducer>
  userApi: ReturnType<Reducer>
  leaderboardApi: ReturnType<Reducer>
  forumApi: ReturnType<Reducer>
  themeApi: ReturnType<Reducer>
}

export interface IResponse {
  data?: string
  error?: {
    data: {
      status: number
      reason: string
    }
  }
}
