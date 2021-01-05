import React, {useState,useEffect} from 'react'
import {Col, Row} from 'react-materialize'
import Timer from '../components/Timer'
import {draft} from '../Atoms'
import {useAtom} from 'jotai'
import socket from '../socketConfig'
function DraftOrderBox(){
    const[live, setLive]= useAtom(draft)
    console.log(live)
    const [round, setRound]=useState(live.round)
    const [pick, Pick]=useState(live.currentPick)


    return (
        <div>
            <Row className='dBox'>
                <Row className='currDRow'>
                    <Col s={3}>
                        <Timer/>
                    </Col>
                </Row> 
                <div className='orderBox'>
                    {live.teams.length>0?
                    <Row>
                        {live.teams.map((team, i)=>{
                        return(
                            <Col s={8} offset='s2' key={i}>
                                <div key={i} className='teams'>{team}</div>
                            </Col>                               
                        )
                    })}
                    </Row>:<div></div>}
                </div>               
            </Row>
        </div>
            )
}
export default DraftOrderBox