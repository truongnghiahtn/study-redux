/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IUserPayload } from "../../interFace/global";
export interface CounterState {
  listUser: IUser[];
  statusCreate: boolean;
  statusUpdate: boolean;
  statusDelete: boolean;
}
interface IUser {
  id: number;
  name: string;
  email: string;
}

const initialState: CounterState = {
  listUser: [],
  statusCreate: false,
  statusUpdate: false,
  statusDelete: false,
};

export const fetchListUser = createAsyncThunk(
  "users/fetchListuser",
  async (userId, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  }
);

export const fetchCreateUser = createAsyncThunk(
  "users/fetchCreate",
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser());
    }
  }
);
export const fetchUpdateUser = createAsyncThunk(
  "users/fetchUpdate",
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser());
    }
  }
);
export const fetchDeleteUser = createAsyncThunk(
  "users/fetchDelete",
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload}`, {
      method: "DELETE",
      headers: {
        "Content-Type": " application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    thunkAPI.dispatch(fetchListUser());
  }
);

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIscreateUser: (state) => {
      state.statusCreate = false;
    },
    setIsUpdateUser: (state) => {
      state.statusUpdate = false;
    },
    setIsDeleteUser: (state) => {
      state.statusDelete = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUser = action.payload;
    }),
      builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.statusCreate = true;
      }),
      builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
        // Add user to the state array
        state.statusUpdate = true;
      }),
      builder.addCase(fetchDeleteUser.fulfilled, (state, action) => {
        // Add user to the state array
        state.statusDelete = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setIscreateUser, setIsUpdateUser, setIsDeleteUser } =
  user.actions;

export default user.reducer;
