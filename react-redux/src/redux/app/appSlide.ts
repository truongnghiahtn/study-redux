import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  mode: string
}

const initialState: AppState = {
  mode: 'light',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeMode:(state,action: PayloadAction<string>)=>{
      state.mode = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {changeMode  } = appSlice.actions

export default appSlice.reducer