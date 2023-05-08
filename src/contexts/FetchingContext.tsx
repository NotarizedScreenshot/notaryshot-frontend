import { fetchPreviewDataByTweetId } from 'lib/apiClient';
import { createContext, useContext, useReducer } from 'react';
import { IMetadata, ITweetData } from 'types';
import { processTweetData } from 'utils';


export interface IFetchingContextState {
  isFetching: boolean;
  tweetId: string | null;
  error: boolean;
  data: {
    metadata: IMetadata | null;
    tweetdata: ITweetData | null;
    imageUrl: string | null;
  } | null;
}

const fetchingContextInitialState: IFetchingContextState = {
  isFetching: false,
  error: false,
  data: null,
  tweetId: null,
};

export const FetchingContext = createContext<IFetchingContextState>(fetchingContextInitialState);

export const useFetchingContext = () => useContext(FetchingContext);

enum EFetchingActionTypes {
  setFetchingStart = 'SET_FETCHING_START',
  setFetchingCompelete = 'SET_FETCHING_COMPLETE',
  setFetchingFailed = 'SET_FETCHING_FAILED',
}

type TFetcingAction = {
  type: EFetchingActionTypes;
  payload?: {
    tweetId: string | null;
    tweetdata: ITweetData | null;
    metadata: IMetadata | null;
    imageUrl: string | null;
  } | null;
};

export const fetchPreviewData = async (dispatch: React.Dispatch<TFetcingAction>, tweetId: string, userId: string) => {
  try {
    dispatch({ type: EFetchingActionTypes.setFetchingStart });
    const result = await fetchPreviewDataByTweetId(tweetId, userId);
    if (!!result) {
      const { imageUrl, tweetdata, metadata } = result;

      const parsedMetadata = metadata ? JSON.parse(metadata) : null;

      const parsedTweetdata = tweetdata ? processTweetData(tweetdata, tweetId) : null;

      dispatch({
        type: EFetchingActionTypes.setFetchingCompelete,
        payload: { tweetdata: parsedTweetdata, metadata: parsedMetadata, imageUrl, tweetId },
      });
    }
  } catch {
    dispatch({ type: EFetchingActionTypes.setFetchingFailed });
  }
};

const reducer = (state: IFetchingContextState, action: TFetcingAction): IFetchingContextState => {
  const { type, payload } = action;

  switch (type) {
    case EFetchingActionTypes.setFetchingStart:
      return { ...state, isFetching: true, error: false, data: null };
    case EFetchingActionTypes.setFetchingCompelete:
      return { ...state, isFetching: false, error: false, data: payload!, tweetId: payload!.tweetId };
    case EFetchingActionTypes.setFetchingFailed:
      return { ...state, isFetching: true, error: true, data: null };
    default:
      return state;
  }
};

export const FetchingDispatchContext = createContext<React.Dispatch<TFetcingAction>>(() => undefined);

export const useFetchingDispatchContext = () => useContext(FetchingDispatchContext);

export const FetchingContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, fetchingContextInitialState);

  return (
    <FetchingContext.Provider value={state}>
      <FetchingDispatchContext.Provider value={dispatch}>{children}</FetchingDispatchContext.Provider>
    </FetchingContext.Provider>
  );
};