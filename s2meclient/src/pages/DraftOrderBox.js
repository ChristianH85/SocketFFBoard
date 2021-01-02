import React, {useState,useEffect} from 'react'
import {Col, Row} from 'react-materialize'
import Timer from '../components/Timer'
import {draft} from '../Atoms'
import {useAtom} from 'jotai'
function DraftOrderBox(){
    const[live, setLive]= useAtom(draft)
    console.log(live)
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
                            <Col s={8} offset='s2' >
                                <div className='teams'>{team}</div>
                            </Col>                               
                        )
                    })}
                    </Row>:<div></div>}
                    {/* {teams.map((team, i)=>{
                        return(
                            <Row>
                                <Col s={8} offset='s2' >
                                    <div className='teams'>{team}</div>
                                </Col>
                            </Row>   
                        )
                    })} */}
                </div>               
            </Row>
        </div>
            )
}
export default DraftOrderBox