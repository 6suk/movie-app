import { createSlice } from '@reduxjs/toolkit';

const movies = createSlice({
  name: 'movie',
  initialState: {
    data: [],
    curPage: 1,
    page: 0,
    count: 0,
  },
  reducers: {
    setMovies: (state, action) => {
      state.data = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setPage: (state) => {
      state.page = state.page + 1;
    },
    setCurPage: (state) => {
      state.curPage += 1;
    },
  },
});

export default movies;
export const { setMovies, setPage, setCount, setCurPage } = movies.actions;
