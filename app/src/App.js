import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [clicks, setClicks] = useState(0);
  const [data, setData] = useState({});

  const getUserInfo = async () => {
    const wsfunction = 'core_webservice_get_site_info';
    const response = await fetch(`/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=${wsfunction}&wstoken=${document.wstoken}`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Usuário: {data?.fullname}<br />
          Site: {data?.sitename}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {clicks} cliques
        </a>
        <button onClick={() => {
          setClicks(clicks + 4);
        }}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
