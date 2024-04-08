import { Route } from 'react-router-dom';
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import Homepage from './Pages/Homepage.js';
import Chatpage from './Pages/Chatpage.js';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact></Route>
      <Route path="/chats" component={Chatpage}></Route>
    </div>
  );
}

export default App;
