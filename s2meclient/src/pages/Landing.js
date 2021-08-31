import React,{useState} from 'react';
import { Col, Row } from 'react-materialize'
import socket from "../socketConfig";
import Options from './Option';

function Landing(){
    // const [ loginP, switchL] = useState(true)
    // const[incoming, setIncoming]=useState([])
        socket.on('user', data=>{
            console.log("######################User"+data)            
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