import { createSlice } from '@reduxjs/toolkit';
import { fetchSearch } from './searchThunk';

export interface ISearchState {
  /**List of repositories */
  repo: any[] | null;
  /**Data loading indicator */
  loading: boolean;
  /**Error message */
  error: any;
}

const initialState: ISearchState = {
  repo: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.repo = [...action.payload.items];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      }),
});

export default searchSlice.reducer;
