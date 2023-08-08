import { fetchPreviewDataByTweetId } from 'lib/apiClient';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { IMetadata, ITweetData } from 'types';
import { useProgressingContext } from './ProgressingContext';

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
      const { imageUrl, metadata, parsedTweetData } = result;

      const parsedMetadata = metadata ? JSON.parse(metadata) : null;

      dispatch({
        type: EFetchingActionTypes.setFetchingCompelete,
        payload: { tweetdata: parsedTweetData, metadata: parsedMetadata, imageUrl, tweetId },
      });
    } else {
      dispatch({ type: EFetchingActionTypes.setFetchingFailed });
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
      if (!payload) return state;
      return { ...state, isFetching: false, error: false, data: payload, tweetId: payload.tweetId };
    case EFetchingActionTypes.setFetchingFailed:
      return { ...state, isFetching: false, error: true, data: null };
    default:
      return state;
  }
};

export const FetchingDispatchContext = createContext<React.Dispatch<TFetcingAction>>(() => undefined);

export const useFetchingDispatchContext = () => useContext(FetchingDispatchContext);

export const FetchingContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, fetchingContextInitialState);

  const { setInProgress } = useProgressingContext();

  useEffect(() => {
    if (!!state.error) {
      setInProgress(false);
    }
  }, [state.error]);

  return (
    <FetchingContext.Provider value={state}>
      <FetchingDispatchContext.Provider value={dispatch}>{children}</FetchingDispatchContext.Provider>
    </FetchingContext.Provider>
  );
};
