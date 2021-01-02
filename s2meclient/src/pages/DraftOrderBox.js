import React, {useState,useEffect} from 'react'
import {Col, Row} from 'react-materialize'
import Timer from '../components/Timer'

function DraftOrderBox(){
    // const [round, setRound]
    const teams=[
        'Team1',
        'Team2',
        'Team3',
        'Team4',
        'Team5',
        'Team6',
        'Team7',
        'Team8',
        'Team9',
        'Team10',
        'Team11',
        'Team12'
    ]
    
    
    // const dRounds=15
    // const turnFunct=()=>{
    //     for(let i =0;i<dRounds;i++){
    //        teams.map((team)=>{
    //        return <Card>{team}</Card>
    //        })
    //     }
    // }
    return (
        <div>
            <Row className='currDRow'>
                <Col s={3}>
                    <Timer/>
                </Col>
            </Row>
            <Row>
                {teams.map((team, i)=>{
                    return(
                    <Col s={12} className='teams'>

                        {team}
                    </Col>
                    )
                })}
            </Row>
        </div>
            )
}
export default DraftOrderBox