import logo from './logo.svg';
import './App.css';
import { SDKManager } from './SDK';

function App() {

  const sdk = new SDKManager()
  
  const subscribeOneSignal = ()=>{
    sdk.init("506871f9-ae52-4e6b-8bda-0d496487410e").then(()=>{
      console.log("Subscribe successfully")
    }).catch((e)=>alert(e))
  }
  const UnSubscribeOneSignal = ()=>{
    sdk.unSubscribeTopics().then((e)=>{
      alert("User Opted Out")
    }).catch((e)=>alert(e))
  }
  const ReSubscribeOneSignal = ()=>{
    sdk.subscribeTopics("",()=>{console.log("CallbackFn")}).then((e)=>{
      alert("User Opted In")
    }).catch((e)=>alert(e))
  }
  return (
    <div className="App">
     <button onClick={subscribeOneSignal} className='button'>Subscribe</button>
     <button onClick={UnSubscribeOneSignal} className='button'>UnSubscribe</button>
     <button onClick={ReSubscribeOneSignal} className='button'>ReSubscribe</button>
    </div>
  );
}

export default App;
