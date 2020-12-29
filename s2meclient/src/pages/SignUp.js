import React, { useState } from 'react'
import { Card, TextInput, Button, Row, Col } from 'react-materialize'
import socket from "../socketConfig";
import { Link } from 'react-router-dom'
import axios from 'axios'
function Signup (props) {

    const [email, setEmail] = useState('')
    const [username, setUName] = useState('')
    const [password, setPass] = useState('')
    const[errM, setErr] = useState('')
    socket.on('connected',data=>{
        // debugger
      console.log(data)
    })

    const validateEmail=(email) =>
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleSubmit = event => {
        event.preventDefault();
        // socket.on('connected',data=>{
        console.log(email)
        //   console.log(data)
        // })
        if(username.length<=0){
            setErr("You need a name friend")
        }
        else if (password.length < 6 ){
            setErr("password must be greater than 6 characters")
        }else if(validateEmail(email)!==true) {
          console.log("invalid email");
          
          setErr(
             "invalid email"
          );
          return;
        }else{
            let signupOBj={
                    username:username,
                    email:email,
                    password: password,
                }
                axios.post('api/user/signup',signupOBj).then(data=>{console.log(data)})
            // socket.emit('signup', signupOBj)
        }
    }
    return (
        <Row>
            <Col s={12} m={8} offset='m2'>
                <form className='login'>
                    <Row>
                        <Col s={12} m={10} offset='m1'>
                        <label className='iLabel'>Username:</label>
                        <input className='lInput' onChange={e => setUName(e.target.value)} name = 'username' type='text' placeholder='U$3RN@M3'/>
                        </Col>
                    </Row>
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
                        <Button id='loginB' type='submit' onClick={handleSubmit}id='primaryBtn'>Sign Up</Button>
                        </Col>
                    </Row>
                    <Link to="/">already a User? Login </Link>
                </form>
            </Col>
        </Row>
    )
}
export default  Signup