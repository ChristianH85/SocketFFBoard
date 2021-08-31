import React, {useState,useEffect} from 'react'
import {Col, Row} from 'react-materialize'
import Timer from '../components/Timer'
import {draft} from '../Atoms'
import {useAtom} from 'jotai'
// import socket from '../socketConfig'
function DraftOrderBox(props){
    const {order, turn}=props
    // const[live, setLive]= useAtom(draft)
   
    // const [round, setRound]=useState(live.round)
    // const [pick, Pick]=useState(live.currentPick)
    const[draftOrder , setDraftOrder]=useState('')
    // const [myPick, setMyPick] = useState(false)
    // const [pickClass, setPickC] = useState('teams')

    useEffect(()=>{
        if(order){
            // console.log(turn)
            setDraftOrder(order)
        }
        console.log(turn)
    }, [order])
    return (   
            <div >
                <Col s={12} className='noMar'>
                    <div className='orderBox'>
                    {draftOrder?draftOrder.map((player, i)=>{
                        return( 
                            <Row key={i}>                           
                                <div id={i===parseInt(turn-1)?'current':'upcoming'} >{player}</div> 
                            </Row>                                                     
                              )
                    })
                    :<div></div>}
                    </div>
                    </Col>
            </div>
            )
}
export default DraftOrderBox