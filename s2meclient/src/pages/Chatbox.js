import React,{useState, useEffect} from 'react'
import {Card, Row, Col,Textarea, Button} from 'react-materialize'
function Chatbox(){
const [msgL, setMsgL]= useState([])
const [inputVal, setInputVal]= useState('')
const tempL= msgL
const nMsg = (e)=>{
e.preventDefault()
console.log(inputVal)
tempL.push(inputVal)
setMsgL(tempL)

}

const inputChng =(e)=>{
    setInputVal(e.target.value)
}
// useEffect=()=>{

// }

// const popMsg= msgL? msgL.map((data,i)=>{
//     return <div className='msgS'key={i}>{data}</div>
//  }):<h6>No Messages Yet</h6>
return<>
    <Card className='Chatcard'>
        <Row>
            <Col sm={3} >
                <Card>
                    <div>
                        {msgL? msgL.map((data,i)=>{
                           return <div className='msgS'key={i}>{data}</div>
                        }):<h6>No Messages Yet</h6>}
                    </div>
                    <hr/>
                    <span><Textarea onChange={inputChng} value={inputVal}></Textarea><Button onClick={nMsg}>Send</Button></span>
                    
                    {/* <span><Textarea></Textarea><Button>Send</Button></span> */}
                </Card>
            </Col>
        </Row>
    </Card>
</>

}
export default Chatbox;