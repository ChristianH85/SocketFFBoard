import React,{useState, useEffect} from 'react'
import {Row, Col, Button} from 'react-materialize'
import { useAtom } from 'jotai'
import {user} from '../Atoms'
import {draft} from '../Atoms'
import axios from 'axios';

// import {messages} from '../Atoms'
import socket from "../socketConfig";
import MessageBox from '../components/MessageBox'
// socket.emit('subscribe','whatabuda')
function Chatbox(props){
const [userInfo, setUInfo]=useAtom(user)
const [msgL, setMsgL]= useState([])
const [inputVal, setInputVal]= useState('')
const [leagueInfo, setLeagueInfo]=useAtom(draft)
const [numMess, setNumM]=useState(0)
// const [load messages]

useEffect(()=>{
    if(!msgL){
        const list= leagueInfo.messages
        setMsgL(list)
    }else if(msgL.length>=1){
    socket.on('incomingMsg',data=>{
        let mList=msgL
        mList.push(data)
        setMsgL(mList)
        setInputVal('')
        console.log(data)
    })
    socket.emit('subscribe', leagueInfo.id)
    socket.on('saved', data=>{console.log(data)})
}
},[msgL])

const handleOutMessage=(e)=>{
    e.preventDefault()
    let mObj={
        room: leagueInfo.id,
        msg:inputVal,
        username: userInfo.username,
        userId: userInfo._id,
        time:new Date()
    }
    socket.emit('outgoingMsg', mObj)
    setInputVal('')
}
const inputChng =(e)=>{
    setInputVal(e.target.value)
}

return<>
        <Row>
            <Col s={12} >
                <form className='Chatcard'>
                    <MessageBox msgL={msgL} userInfo={userInfo}/>
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