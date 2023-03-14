import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [postMessage, setPostMessage] = useState('');
  const [storageData, setStorageData] = useState('');
  const [grandChildPostMessage, setGrandChildPostMessage] = useState('');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const receivePostMessage = useCallback((event: MessageEvent) => {
    setGrandChildPostMessage(JSON.stringify(event.data));
    console.log(event);
  }, []);

  useEffect(() => {
    window.addEventListener('message', receivePostMessage);

    return () => {
      window.removeEventListener('message',receivePostMessage );
    }
  }, [receivePostMessage]);

  const sendPostMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPostMessage(inputValue);
    iframeRef.current?.contentWindow?.postMessage(inputValue, "http://localhost:8080");
  }

  const sendLocalStorage = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setStorageData(inputValue);
    window.localStorage.setItem('react-data', inputValue);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="react"/>
        <label htmlFor="react-input">
          react post message
        </label>
        <input
          type="text"
          name="react-input"
          id="react-input"
          value={postMessage}
          onChange={sendPostMessage}
        />
        <label htmlFor="react-input">
          react local storage
        </label>
        <input
          type="text"
          name="react-input"
          id="react-input"
          value={storageData}
          onChange={sendLocalStorage}
        />
        <br />
        <label>Post message from grand child</label>
        <output>{grandChildPostMessage}</output>
      </header>
      <iframe
        ref={iframeRef}
        src="http://localhost:8080"
        title="live preview">
      </iframe>
    </div>
  );
}

export default App;
