import React, {useEffect} from 'react';
import Landing from './pages/Landing'
import './App.css';
import { BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAtom } from 'jotai'
import {loggedIn, user} from './Atoms'
// import socket from "./socketConfig";
import LeagueOptions from './pages/LeagueOptions';
import DraftContainer from './pages/DraftContainer';
import DraftSearch from './pages/DraftSearch';
import Account from './pages/Account';
import MyLeagues from './pages/MyLeagues';
import Auth from './helpers/auth'
import NavBar from './components/Navbar';
function App() {
  const[logInStatus, setLogin]=useAtom(loggedIn)
  const [userInfo, setUser]=useAtom(user)
    useEffect(()=>{
      let loggedIn=Auth.loggedIn()
      if(loggedIn!==null){
        setLogin(loggedIn)
        let user=JSON.parse(localStorage.getItem('user'))
        setUser(user)
      }      
    })
  return (
    <div className="App">
      <Router>
        <NavBar status={logInStatus} user={userInfo} setLogin={setLogin}/>
        {logInStatus?
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route exact path='/loptions' component={LeagueOptions}/>
              <Route exact path ='/draft' component={DraftContainer}/>
              <Route exact path ='/myLeagues' component={MyLeagues}/>
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
