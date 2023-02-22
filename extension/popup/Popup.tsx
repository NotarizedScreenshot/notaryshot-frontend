import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as yup from 'yup';
import './popup.css';

const Popup: React.FC = () => {
  const [urlInputValue, setUrlInputValue] = useState<string>('');
  const [validating, setValidating] = useState<boolean>(false);
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [dirtry, setDirty] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const urlValidationSchema = { url: yup.string().required().url() };
  const validate = (url: string) => yup.object().shape(urlValidationSchema).validate({ url });

  const buttonHandler = () => {
    chrome.runtime.sendMessage({ url: null }, (response) => {
      console.log('button handler sendMessage response: ', response);
    });
  };

  const notarizeHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      chrome.runtime.sendMessage({ url: tabs[0].url }, (response) => {
        console.log('button handler sendMessage response: ', response);
      });
    });
  };

  const changeInputHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrlInputValue(event.currentTarget.value);
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
    validate(urlInputValue)
      .then(() => {
        setValidating(false);
        setInvalid(false);
        setSubmitting(true);

        chrome.runtime.sendMessage({ url: urlInputValue }, (response) => {
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

  return (
    <div className='container'>
      <div className='background'></div>
      <div className='icon-container' onClick={buttonHandler}>
        <img src='icon-header.png' alt='icon' className='icon-container__icon' />
      </div>
      <h1 className='h1'>Save your evidence</h1>
      <div className='send-url-container'>
        <h3 className='h3'>Submit a url of a resource you want to be saved forever:</h3>
        <form className='send-url-container_form' onSubmit={submitHandler}>
          <label htmlFor='url' hidden={true}>
            URL
          </label>
          <input
            className='send-url-container_input'
            ref={inputRef}
            name='url'
            autoComplete='off'
            placeholder='url'
            value={urlInputValue}
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
          <div className='send-url-container_error' hidden={!isInvalid}>
            {error}
          </div>
        </form>
      </div>
      <div className='send-url-container'>
        <h3 className='h3'>Press button to notorize current page</h3>
        <div>
          <button onClick={notarizeHandler} className='btn-notarize'>
            Notarize current page
          </button>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<Popup />);
