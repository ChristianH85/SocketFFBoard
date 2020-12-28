import React,{useState} from 'react';
import { Button, Card, Col, Row } from 'react-materialize'
import socket from "../socketConfig";
import Options from './Option';

function Landing(){
    const [ loginP, switchL] = useState(true)
    const[incoming, setIncoming]=useState([])
        // const endpoint= process.env.Port || 'http://127.0.0.1:3001'
        // const socket = socketIOClient(endpoint);
        // const [socket] = useSocket(endpoint)
        // socket.connect();
        // console.log(socket)
        // 
        socket.on('user', data=>{
            console.log("######################User"+data)
            // const user= data.user
            
        })
        
return(
    <div className= 'home valign-wrapper center-align'>
        <Row >
            <Col s={12} m={8} offset='m2'> 
                <Options/>
            </Col> 
        </Row>
    </div>
)
}
export default Landing