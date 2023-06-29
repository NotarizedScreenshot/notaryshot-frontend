import { useRef, useState } from 'react';
import cn from 'classnames';

import { ICutsomFormProps } from './TweetIdFormProps';
import styles from './TweetIdForm.module.scss';

import {
  useFetchingDispatchContext,
  fetchPreviewData,
  useFetchingContext,
  useConnectionContext,
  useProgressingContext,
  useTransactionContext,
} from 'contexts';
import { useNavigate } from 'react-router-dom';
import { validateTweetLinkOrTweetId } from 'utils';

export const TweetIdForm: React.FC<ICutsomFormProps> = ({
  initialInputData,
  validate = validateTweetLinkOrTweetId,
}) => {
  const dispatch = useFetchingDispatchContext();
  const { isFetching } = useFetchingContext();
  const { userId, connectionError } = useConnectionContext();
  const { setInProgress, setProgress } = useProgressingContext();
  const { resetTransactionStatus } = useTransactionContext();

  const [urlInputValue, setUrlInputValue] = useState<string>(initialInputData ? initialInputData : '');
  const [dirty, setDirty] = useState<boolean>(false);
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [validating, setValidating] = useState<boolean>(false);

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const clearHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    setDirty(false);
    setUrlInputValue('');
    setInvalid(false);
    setValidating(false);
    setError(null);
    inputRef.current?.focus();
  };

  const changeInputHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrlInputValue(event.currentTarget.value);
    if (dirty) {
      validate(event.currentTarget.value)
        .then(() => {
          setInvalid(false);
          setError(null);
          setValidating(false);
        })
        .catch((inputValidationError: Error) => {
          setInvalid(true);
          setError(inputValidationError.message);
        });
    }
  };
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setDirty(true);
    setValidating(true);
    validate(urlInputValue)
      .then((data: string) => {
        if (!connectionError) {
          setInProgress(true);
          setProgress(0);
          setInvalid(false);
          fetchPreviewData(dispatch, data, userId!);
        }
        setValidating(false);
        resetTransactionStatus();
        navigate(`/preview`);
      })
      .catch((submitValidationError: Error) => {
        setInvalid(true);
        setError(submitValidationError.message);
        inputRef.current?.focus();
      });
  };
  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='tweetid' hidden={true}>
            Tweet id or tweet url input
          </label>
          <input
            ref={inputRef}
            className={styles.input}
            id='tweetid'
            name='tweetid'
            autoComplete='off'
            placeholder='tweet id or URL'
            value={urlInputValue}
            onChange={changeInputHandler}
            disabled={isFetching}
          />
          <button
            type='button'
            aria-label='clear-button'
            className={styles.clearButton}
            onClick={clearHandler}
            disabled={isFetching}
          ></button>
        </div>
        <div className={styles.controls}>
          <button
            className={styles.button}
            type='submit'
            aria-label='submit-button'
            disabled={validating || isInvalid || isFetching}
          >
            <svg width='18' height='15' viewBox='0 0 18 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M15.25 2.37503H13.0859L12.0234 0.781276C11.9669 0.694137 11.8893 0.622675 11.7978 0.573511C11.7063 0.524348 11.6039 0.499072 11.5 0.500026H6.5C6.39613 0.499072 6.29371 0.524348 6.20221 0.573511C6.11071 0.622675 6.0331 0.694137 5.97656 0.781276L4.91406 2.37503H2.75C2.25335 2.37708 1.77763 2.57529 1.42645 2.92647C1.07526 3.27766 0.877057 3.75338 0.875 4.25003V13C0.877057 13.4967 1.07526 13.9724 1.42645 14.3236C1.77763 14.6748 2.25335 14.873 2.75 14.875H15.25C15.7466 14.873 16.2224 14.6748 16.5736 14.3236C16.9247 13.9724 17.1229 13.4967 17.125 13V4.25003C17.1229 3.75338 16.9247 3.27766 16.5736 2.92647C16.2224 2.57529 15.7466 2.37708 15.25 2.37503ZM11.8125 8.31253C11.8125 8.86879 11.6475 9.41255 11.3385 9.87507C11.0295 10.3376 10.5902 10.6981 10.0763 10.9109C9.56238 11.1238 8.99688 11.1795 8.45131 11.071C7.90574 10.9625 7.4046 10.6946 7.01126 10.3013C6.61793 9.90793 6.35006 9.40679 6.24154 8.86122C6.13302 8.31565 6.18872 7.75015 6.40159 7.23623C6.61446 6.72231 6.97495 6.28306 7.43746 5.97402C7.89997 5.66498 8.44374 5.50003 9 5.50003C9.74592 5.50003 10.4613 5.79634 10.9887 6.32379C11.5162 6.85123 11.8125 7.56661 11.8125 8.31253Z'
                fill={validating || isInvalid || isFetching ? '#6c7f83' : '#112631'}
              />
            </svg>
            <p className='p2'>Immortalize</p>
          </button>
        </div>
        <div className={cn(styles.error, isInvalid ? null : styles.hidden)}>{error}</div>
      </form>
    </div>
  );
};
