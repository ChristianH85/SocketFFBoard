import React, {useState,useEffect} from 'react';
import {useAtom} from 'jotai'
import {draft} from '../Atoms'
import { Col, Row, Select } from 'react-materialize';
function Picked({picks}){
    const [league,setleague]=useAtom(draft)
    const [picked,setPicked]=useState([])
    useEffect(()=>{
        setPicked(picks)
    },[picks])
    const handleSelect=async (e)=>{
        if(e.target.value==='All'){
            setPicked(picks)
        }
        else{ 
            let userFilter= await picks.filter(pick=>{return pick.email===e.target.value})
            setPicked(userFilter)
        }
    }
    return(
        <div className='orderBox'>
            <Row>
                <Col s={10} offset='s1'>
                    <Select onChange={(e)=>{handleSelect(e)}} className='pDrop'>
                        <option value='All'>All</option>
                        {league.teams.map((team,i)=>{return <option value={team} key={i}>{team}</option>})}
                    </Select>
                </Col>
            
            </Row>
            <Row id='pickedList'>
                    <Col s={1}>Pick</Col>
                    <Col s={1}>POS</Col>
                    <Col s={4}>Name</Col>
                    <Col s={1}>Team</Col>
                    <Col s={5}>User</Col>
                </Row>
            {picked.length>0?picked.map((pick,i)=>{
                return(  
                    <Row className={`${pick.pick.pos} pRow` } key={i}>
                        <Col className='pCol' s={1}>{parseInt(i)+1}</Col>
                        <Col className='pCol' s={1}>{pick.pick.pos}</Col>
                        <Col className='pCol' s={3}>{pick.pick.name}</Col>
                        <Col className='pCol' s={2}>{pick.pick.team}</Col>
                        <Col className='pCol' s={5}>{pick.email}</Col>
                    </Row>)
            }):<p>No Picks Yet</p>}
        </div>
    )
}
export default Picked