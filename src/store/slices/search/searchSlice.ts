import { createSlice } from '@reduxjs/toolkit';
import { fetchSearch } from './searchThunk';
import { RejectedDataType } from '../../../types/errorTypes';
import { Data } from '../../../components/table/types';

/**Type of responsive from server */
export interface IResponsiveItems extends Data {
  /**Other fields */
  [key: string]: string | number | object | [];
}

/**Type of initial state */
export interface ISearchState {
  /**List of repositories */
  repo: IResponsiveItems[];
  /**Data loading indicator */
  loading: boolean;
  /**Error message */
  error: RejectedDataType | null;
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
