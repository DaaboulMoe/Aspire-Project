import { configureStore } from '@reduxjs/toolkit'; 
import usersContentReducer from './features/UsersContent/UsersContentSlice';

const store = configureStore({
  reducer: {
     usersContent: usersContentReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Optional: Enable DevTools in development
});

export default store;
