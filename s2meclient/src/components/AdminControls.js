import React , {useState,useEffect} from 'react'
import {useAtom} from 'jotai'
import{user, draft} from '../Atoms'
import {Row,Col, Button} from 'react-materialize'
import DraftApi from "../helpers/draft";
import socket from "../socketConfig"
function AdminControls(){
    const [me, setMe]=useAtom(user)
    const [thisLeague, setThisLeague]=useAtom(draft)
    console.log(me)
    console.log(thisLeague)
    useEffect(()=>{
        socket.on('start',data=>{
            console.log('started',data)
            // setTime(119)
            // setStart(true)
        })
    },[])
    const beginDraft=()=>{
        let room={room:thisLeague._id}
        // socket.emit('startDraft',room)
        DraftApi.startDraft(thisLeague)
    }
    const endDraft=()=>{
        let room={room:thisLeague._id}
        // socket.emit('startDraft',room)
        DraftApi.endDraft(thisLeague)
    }
    return(
        <div className= 'admin'>
            <Row>
            <Col s={12}>
                    <Button onClick={beginDraft}>Start Draft</Button>
                </Col>
                <Col s={12}>
                    <label className='adLabel'>Make Selection</label>
                    <input></input>   
                </Col>
                <Col s={12}>
                    <Button onClick={endDraft}>End Draft</Button>
                </Col>
            </Row>
        </div>
    )
}
export default AdminControls
