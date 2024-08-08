import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType, RejectedDataType } from '../../../types/errorTypes';
import SearchService from '../../../services/search';

interface IFetchSearch {
  /** Search string. */
  readonly query: string;
  /** Page number to receive new items. */
  readonly page: number;
}

interface IResultsSearch {
  incomplete_results: boolean;
  /**List of repositories */
  items: [];
  /**Total count of repositories */
  total_count: number;
}

export const fetchSearch = createAsyncThunk<
  IResultsSearch,
  IFetchSearch,
  { readonly rejectValue: RejectedDataType }
>('repo/fetchSearch', async ({ query, page }, thunkAPI) => {
  try {
    const response = await SearchService.fetchSearch(query, page);
    console.log('response', response);
    return response;
  } catch (err: unknown) {
    console.log('err', err);
    const knownError = err as ErrorType;
    console.log('knownError', knownError);

    return thunkAPI.rejectWithValue({
      messageError: knownError.message,
      status: knownError.response?.status,
    });
  }
});
