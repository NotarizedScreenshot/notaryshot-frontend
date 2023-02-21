import React from 'react';
import ReactDOM from 'react-dom/client';

const Options = () => {
  return (
    <div>
      <h1>Quantum oracle options</h1>
      <div>
        <img src='icon.png' alt='icon'></img>
      </div>
    </div>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<Options />);
