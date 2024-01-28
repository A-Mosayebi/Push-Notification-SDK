import logo from './logo.svg';
import './App.css';
import { SDKManager } from './Skd';

function App() {

  const sdk = new SDKManager()
  sdk.init("506871f9-ae52-4e6b-8bda-0d496487410e")
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
