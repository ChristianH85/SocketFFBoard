import React, {useState,useEffect} from 'react';
import {useAtom} from 'jotai'
import {draft} from '../Atoms'
import { Col, Row } from 'react-materialize';
function Picked({picks}){
    const [league,setleague]=useAtom(draft)
    const [picked,setPicked]=useState([])
    useEffect(()=>{
        setPicked(picks)
    },[picks])

    return(
        <div className='orderBox'>
            <Row id='pickedList'>
                    <Col s={1}>Pick</Col>
                    <Col s={1}>POS</Col>
                    <Col s={5}>Name</Col>
                    <Col s={2}>Team</Col>
                    <Col s={3}>User</Col>
                </Row>
            {picked.length>0?picked.map((pick,i)=>{
                return(  
                    <Row className={pick.pick.pos} key={i}>
                        <Col s={1}>{parseInt(i)+1}</Col>
                        <Col s={1}>{pick.pick.pos}</Col>
                        <Col s={5}>{pick.pick.name}</Col>
                        <Col s={2}>{pick.pick.team}</Col>
                        <Col s={3}>{pick.email}</Col>
                    </Row>)
            }):<p>No Picks Yet</p>}
        </div>
    )
}
export default Picked