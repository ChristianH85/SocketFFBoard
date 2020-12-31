import React,{useState, useEffect} from 'react'
import {Row, Col, Button} from 'react-materialize'
import { useAtom } from 'jotai'
import {user} from '../Atoms'
import axios from 'axios';

// import {messages} from '../Atoms'
import socket from "../socketConfig";
// socket.emit('subscribe','whatabuda')
function Chatbox(props){
const [userInfo, setUInfo]=useAtom(user)
const [msgL, setMsgL]= useState([])
const [inputVal, setInputVal]= useState('')
const [leagueId, setLeagueId]=useState('5fecd6021523ca47ba76f906')
const [numMess, setNumM]=useState(0)

useEffect(()=>{
    socket.on('incomingMsg',data=>{
        let mList=msgL
        mList.push(data)
        setMsgL(mList)
        setInputVal('')
        console.log(data)
    })
    socket.emit('subscribe', leagueId)
},[])
// useEffect(()=>{},)

const handleOutMessage=(e)=>{
    e.preventDefault()
    let mObj={
        room: leagueId,
        msg:inputVal,
        username: userInfo.username,
        userId: userInfo._id,
        time:new Date()
    }
    socket.emit('outgoingMsg', mObj)
    
}


// console.log(props)
// const nMsg = (e)=>{
// e.preventDefault()
// let mObj={
//     msg:inputVal,
//     username: userInfo.ussername,
//     time:new Date()
// }
// props.handleOut(mObj)
// tempL.push(mObj)
// setMsgL(tempL)
// setInputVal('')

// }

const inputChng =(e)=>{
    setInputVal(e.target.value)
}

return<>
        <Row>
            <Col s={12} >
                <form className='Chatcard'>
                    <div className='msgbox'>
                        {msgL? msgL.map((data,i)=>{
                            // console.log(data)
                            if(data.userId===userInfo._id){
                                return (
                                    <div className='msgS msg'key={i}>
                                        <Row>
                                        <h5>{data.msg} </h5>
                                        </Row>
                                        <hr/>
                                        <Row>
                                            <Col s={6}>
                                            <p className='time'>{data.time.toString()}</p>
                                            </Col>
                                            <Col s={6}>
                                            <h6 className='userN'> {data.username.toString()}</h6>
                                            </Col>
                                        </Row>
                                    </div>)
                            }else{return (
                                <div className='msgR msg'key={i}>
                                    <Row>
                                        <h5>{data.msg} </h5>
                                    </Row>
                                        <hr/>
                                     <Row>
                                        <Col s={6}>
                                            <p className='time'>{data.time.toString()}</p>
                                        </Col>
                                        <Col s={6}>
                                            <h6 className='userN'> {data.username.toString()}</h6>
                                        </Col>
                                    </Row>
                                </div>)}

                        }):<h6>No Messages Yet</h6>}
                    </div>
                    <Row>
                        <Col s={12} > 
                        <textarea onChange={inputChng} value={inputVal}className='chatIn'></textarea>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={10} offset='s1'> 
                        <Button onClick={handleOutMessage}>Send</Button>
                        </Col>
                    </Row>
                </form>
            </Col>
        </Row>

</>

}
export default Chatbox;