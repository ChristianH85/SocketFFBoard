import React,{useState, useEffect} from 'react'
import {Card, Row, Col,Textarea, Button} from 'react-materialize'
function Chatbox(props){
const [msgL, setMsgL]= useState([])
const [inputVal, setInputVal]= useState('')
const tempL= msgL
// console.log(props)
const nMsg = (e)=>{
e.preventDefault()
let mObj={
    msg:inputVal,
    time:new Date()
}
props.handleOut(mObj)
tempL.push(mObj)
setMsgL(tempL)
setInputVal('')

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
            <Col s={12} >
                <Card>
                    <div>
                        {msgL? msgL.map((data,i)=>{
                            // console.log(data)
                        return <div className='msgS'key={i}>{data.msg} <p>{data.time.toString()}</p></div>
                            
                        }):<h6>No Messages Yet</h6>}
                    </div>
                    <hr/>
                    <span ><textarea onChange={inputChng} value={inputVal}className='chatIn'></textarea><Button onClick={nMsg}>Send</Button></span>
                    
                    {/* <span><Textarea></Textarea><Button>Send</Button></span> */}
                </Card>
            </Col>
        </Row>
    </Card>
</>

}
export default Chatbox;