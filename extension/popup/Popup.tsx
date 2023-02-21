import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';

import './popup.css';

const Popup: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const notarizeHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      chrome.runtime.sendMessage({ url: tabs[0].url }, (response) => {
        console.log('button handler sendMessage response: ', response);
      });
    });
  };
  const submitHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!!inputRef.current) {
      chrome.runtime.sendMessage({ url: inputRef.current.value }, (response) => {
        console.log('button handler sendMessage response: ', response);
      });
    }
  };

  return (
    <div>
      <h1>Notarize everything!</h1>
      <div>
        <h3>Press button to notorize current page</h3>
        <div>
          <button onClick={notarizeHandler} className='btn-notarize'>
            Notarize current page
          </button>
        </div>
        <h3>Or submit a url of a resource you want to be saved forever:</h3>
        <div>
          <input ref={inputRef} placeholder='url'></input>
          <button onClick={submitHandler} className='btn-notarize'>
            Submit
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
