import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  notes:[
    // {
    //   title: "",
    //   content: "",
    //   activeBackgroundColor: "",
    //   activeBackgroundImage: "",
    //   label: "notes",
    //   pinned: false,
    //   id: crypto.randomUUID(),
    // }
  ],
  searchQuery: "",
};

export const noteSlice = createSlice({
  name: 'noteStore',
  initialState,
  reducers: {
    createNote: (state, action) =>{
      state.notes.push(action.payload)
    },
    updateNote:(state,action) => {
      const {index, payload} = action.payload;
      state.notes[index] = {
        ...state.notes[index],
        ...payload,
      };
    },
    deleteNote:(state,action)=>{
      const {index} = action.payload;
      state.notes?.splice(index,1);
    },
    updateSearchQuery: (state, action)=>{
      state.searchQuery = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { createNote, updateNote, deleteNote, updateSearchQuery } = 
  noteSlice.actions

export default noteSlice.reducer