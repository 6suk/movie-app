import { createSlice } from '@reduxjs/toolkit';

const movies = createSlice({
  name: 'movie',
  initialState: {
    data: [],
    limit: 20,
  },
  reducers: {
    setMovies: (state, action) => {
      state.data = action.payload;
    },
    setLimit: (state, action) => {
      state.limit += 10;
      if (state.limit === 60) state.limit = 50;
    },
  },
});

export default movies;
export const { setMovies, setLimit } = movies.actions;
