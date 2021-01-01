import React from 'react';
import Landing from './pages/Landing'
import './App.css';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
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
  // socket.on('user',data=>{
  //   // setUser(data)
  //   // setLogin(true)
  // })
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
              <Route render={() => <Redirect to="/" />} />
            </Switch>:
             <Switch>
             <Route exact path ='/'  component={Login}/>
             <Route exact path='/signup' component={SignUp}/>
             <Route render={() => <Redirect to="/" />} />
           </Switch>
      }
      </Router>
    </div>
  );
}

export default App;
