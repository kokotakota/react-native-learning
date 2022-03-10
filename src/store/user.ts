import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from "react-redux"
import { RootState } from 'store'

const sliceName = 'user'

export type User = {
  id?: string
  name?: string
}

export type UpdateNamePayload = string

const initialState: User = {}

export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      return payload
    },
    updateName(state, { payload }: PayloadAction<UpdateNamePayload>) {
      state.name = payload
    },
    reset(): User {
      return initialState
    }
  }
})

export const useUserSelector = () => useSelector((state: RootState) => state[sliceName])