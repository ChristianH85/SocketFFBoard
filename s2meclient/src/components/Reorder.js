import React, {useState,useEffect} from 'react'
import {Row,Col} from 'react-materialize'
import {useAtom} from 'jotai'
import {draft} from '../Atoms'
import DropMenu from './DropMenu'
function Reorder(props){
    const[order, setOrder]=useState([])
    const[draftOrder, setDraftOrder]=useAtom(draft)
    
    // useEffect(()=>{
        
    // }, [])
    
    console.log(props)
return(
    <div  className='reorderList'>
        {draftOrder.teams?draftOrder.teams.map((player,i)=>{
        return(<Row className='pItem' key={i}>
            <Col s={2}  id={parseInt(i)}>{parseInt(i+1)}</Col>
            <Col s={10}>
                <DropMenu mOrder={draftOrder.teams} i={i} order={order} setOrder={setOrder}/>
            </Col>
        </Row>)}):null}
    </div>
)
}
export default Reorder
