import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as yup from 'yup';
import './popup.css';
import { validateBigInt } from '../../src/utils';

const Popup: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [validating, setValidating] = useState<boolean>(false);
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [dirtry, setDirty] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [tweetId, setTweetId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const validate = validateBigInt;

  const buttonHandler = () => {
    chrome.runtime.sendMessage({ url: null }, (response) => {
      console.log('button handler sendMessage response: ', response);
    });
  };

  const notarizeHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      chrome.runtime.sendMessage({ tweetId }, (response) => {
        console.log('button handler sendMessage response: ', response);
      });
    });
  };

  const changeInputHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.currentTarget.value);
    if (dirtry) {
      validate(event.currentTarget.value)
        .then((data) => {
          setInvalid(false);
          setError(null);
          setValidating(false);
        })
        .catch((error: yup.ValidationError) => {
          setInvalid(true);
          setError(error.message);
        });
    }
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setDirty(true);
    setValidating(true);
    validate(inputValue)
      .then(() => {
        setValidating(false);
        setInvalid(false);
        setSubmitting(true);

        chrome.runtime.sendMessage({ tweetId: inputValue }, (response) => {
          console.log('button handler sendMessage response: ', response);
          setSubmitting(false);
        });
      })
      .catch((error: yup.ValidationError) => {
        setInvalid(true);
        setError(error.message);
        inputRef.current?.focus();
      });
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url!);
      const host = url.host;
      const currentPath = url.pathname;
      const urlTweetId = currentPath.split('/').at(-1) ?? '';

      if (host !== 'twitter.com' || !currentPath.includes('status')) {
        setTweetId(null);
        return;
      }
      validateBigInt(urlTweetId)
        .then(() => {
          setTweetId(urlTweetId);
        })
        .catch(() => {
          setTweetId(null);
        });
    });
  }, []);

  return (
    <div className='container'>
      <div className='background'></div>
      <div className='icon-container' onClick={buttonHandler}>
        <img src='icon-header.png' alt='icon' className='icon-container__icon' />
      </div>
      <h1 className='h1'>Save your evidence</h1>
      <div className='send-tweetid-container'>
        <h3 className='h3'>
          {tweetId
            ? 'Press button to notarize current tweet'
            : 'Please follow up to a tweet page to notarize the tweet'}
        </h3>
        <div>
          <button onClick={notarizeHandler} className='btn-notarize' disabled={!tweetId}>
            Notarize current tweet
          </button>
        </div>
      </div>
      <div className='send-tweetid-container'>
        <h3 className='h3'>Or submit an id of a tweet you want to be saved forever:</h3>
        <form className='send-tweetid-container_form' onSubmit={submitHandler}>
          <label htmlFor='tweet-id' hidden={true}>
            Tweet Id
          </label>
          <input
            className='send-tweetid-container_input'
            ref={inputRef}
            name='tweet-id'
            autoComplete='off'
            placeholder='tweet id'
            value={inputValue}
            onChange={changeInputHandler}
          ></input>
          <button
            type='submit'
            className='btn-notarize'
            aria-label='submit-button'
            disabled={validating || isInvalid || submitting}
          >
            Submit
          </button>
          <div className='send-tweetid-container_error' hidden={!isInvalid}>
            {error}
          </div>
        </form>
      </div>
    </div>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<Popup />);
