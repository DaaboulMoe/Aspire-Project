import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3000/users';

// Thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(baseURL); 
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const response = await axios.post(baseURL, user);
  return response.data;
});

export const editUser = createAsyncThunk('users/editUser', async (user) => {
  const response = await axios.post(`${baseURL}/edit/${user.id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.post(`${baseURL}/delete/${userId}`);
  return userId;
});

// Slice
const usersContentSlice = createSlice({
  name: 'usersContent',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
      console.log('Fetched users:', action.payload); // Ensure the data is logged
      return action.payload.map(user => ({
        ...user,
        id: user._id, // Mapping _id to id for consistency
      }));
    })
    .addCase(addUser.fulfilled, (state, action) => [...state, action.payload])
    .addCase(editUser.fulfilled, (state, action) =>
      state.map(user => (user.id === action.payload.id ? action.payload : user))
    )      
    .addCase(deleteUser.fulfilled, (state, action) =>
      state.filter(user => user.id !== action.payload)
    );
  },
});

export default usersContentSlice.reducer;
