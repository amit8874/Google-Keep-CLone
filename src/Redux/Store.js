import {configureStore} from '@reduxjs/toolkit';
import notesReducer from './HomeSlice';

export const store = configureStore({
  reducer: {
    noteStore: notesReducer,
  },
});