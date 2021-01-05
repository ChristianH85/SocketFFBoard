import React, { useState } from 'react'
import { Button, Row, Col } from 'react-materialize'
import socket from "../socketConfig";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useAtom } from 'jotai'
import {loggedIn, user, port} from '../Atoms'

function Login (props) {
    const[point, setPort]=useAtom(port)
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const[errM, setErr] = useState('')
    const[logInStatus, setLogin]=useAtom(loggedIn)
  const [userInfo, setUser]=useAtom(user)
    socket.on('connected',data=>{
      console.log(data)
    })

    const validateEmail=(email) =>
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (password.length < 6 ){
            setErr("password must be greater than 6 characters")
        }else if(validateEmail(email)!==true) {
          console.log("invalid email");
          
          setErr(
             "invalid email"
          );
          return;
        }else{
            let loginOBj={
                    email:email,
                    password: password,
                }

            axios.post('api/user/login', loginOBj).then(data=>{
                console.log(data)
                setPort(data.data.port)
                setUser(data.data.user)
                setLogin(true)
            })
        }
    }
    return (
        <Row>
            <Col s={12} m={8} offset='m2'>
                <form className='login'>
                <Row>
                        <Col s={12} m={10} offset='m1'>
                        <label className='iLabel'>Email:</label>
                        <input className='lInput' onChange={e => setEmail(e.target.value)} name = 'email' type='email' placeholder='email'/>
                        </Col>
                    </Row>
                    <Row>
                        <Col  s={12} m={10} offset='m1'>
                            <label className='iLabel'>Password:</label>
                        <input className='lInput' onChange={e => setPass(e.target.value)} name = 'pword' type='password' placeholder ='password'/>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={10} m={8} offset='s1 m2'>
                        {errM!==''?
                    <div id='errMess'>
                        <p> {errM}</p>
                    </div>:<div></div>}
                        </Col>
                    </Row>
                    <Row>
                        <Col s={10} m={8} offset='s1 m2'>
                        <Button id='loginB' type='submit' onClick={handleSubmit}id='primaryBtn'>Login</Button>
                        </Col>
                    </Row>
                    <Link to="/signup">Signup for new account</Link>
                </form>
            </Col>
        </Row>
    )
}
export default  Login