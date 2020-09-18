import React,{useState} from 'react';
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-materialize'
import useSocket from 'use-socket.io-client'
import Login from './Login';
import SignUp from './SignUp';
import Chatbox from './Chatbox';

function Landing(){
    const [ loginP, switchL] = useState(true)
        // const endpoint= process.env.Port || 'http://127.0.0.1:3001'
        // // const socket = socketIOClient(endpoint);
        // const [socket] = useSocket(endpoint)
        // socket.connect();
        // // console.log(socket)

        // socket.on('connected',data=>{
        //   console.log('connected')
        // })
        // socket.on('user', data=>{
        //     console.log("######################User"+data)
        //     // const user= data.user
            
        // })

        // const login=(data)=>{
        //             let email=data.email
        //             let pword= data.password
        //             console.log(email,pword)
        //             socket.emit('login', {email,pword} )
        //         }
        // const signup=(data)=>{
        //     let usr=data.username
        //     let email = data.email
        //     let pword= data.password
        //     console.log(usr,email,pword)
        //     socket.emit('newUser', {usr, email,pword} )
        // }
return(
    <div className= 'home valign-wrapper center-align'>
        <Row >
            <Col s={12} md={8} lg={8}>
            {/* <Card className='splash'>
                {loginP===true?
                    <div>
                        <Login lUser={login}/>
                        <br/>
                        <Button type ='button' onClick={()=>{switchL(false)}}>Sign Up</Button>
                    </div>
                    :
                    <div>
                        <SignUp nUser={signup}/>
                        <br/>
                        <Button type ='button' onClick={()=>{switchL(true)}}>Login</Button>
                    </div>
                }
            </Card> */}
            <Chatbox/>
            </Col>
        </Row>
    </div>
)
}
export default Landing