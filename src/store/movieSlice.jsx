import { createSlice } from '@reduxjs/toolkit';

const movies = createSlice({
  name: 'movie',
  initialState: {
    data: [],
  },
  reducers: {
    setMovies: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default movies;
export const { setMovies, getMovie } = movies.actions;
