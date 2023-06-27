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
    getMovie: (state, action) => {
      const movies = state.data;
      return movies.find((movie) => movie.id === action.payload);
    },
  },
});

export default movies;
export const { setMovies, getMovie } = movies.actions;
