import React from 'react';
import Landing from './pages/Landing'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAtom } from 'jotai'
import {loggedIn, user} from './Atoms'
import socket from "./socketConfig";
import LeagueOptions from './pages/LeagueOptions';
import DraftContainer from './pages/DraftContainer';
import DraftSearch from './pages/DraftSearch';
import Account from './pages/Account';
function App() {
  const[logInStatus, setLogin]=useAtom(loggedIn)
  const [userInfo, setUser]=useAtom(user)
  socket.on('user',data=>{
    // setUser(data)
    // setLogin(true)
  })
  return (
    <div className="App">
      <Router>
        {logInStatus?
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route exact path='/loptions' component={LeagueOptions}/>
              <Route exact path ='/draft' component={DraftContainer}/>
              <Route exact path ='/search' component={DraftSearch}/>
              <Route exact path ='/account' component={Account}/>
            </Switch>:
             <Switch>
             <Route exact path ='/'  component={Login}/>
             <Route exact path='/signup' component={SignUp}/>
           </Switch>
      }
        {/* <header className="App-header">
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
        </header> */}
      </Router>
    </div>
  );
}

export default App;
