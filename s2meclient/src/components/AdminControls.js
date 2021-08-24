import React , {useState,useEffect} from 'react'
import {useAtom} from 'jotai'
import{draft} from '../Atoms'
import {Row,Col, Button,Modal} from 'react-materialize'
import DraftApi from "../helpers/draft";
import socket from "../socketConfig"
import Reorder from './Reorder';
function AdminControls(){
    const [thisLeague, setThisLeague]=useAtom(draft)
    const [showReorder, setShowReorder]=useState(false)
    const [fValue, setFvalue]= useState('')
    const [active, setActive]= useState(false)
    const [dList,setDlist]=useState([])
    useEffect(()=>{
        if(thisLeague.status==='active'){
            setActive(true)
        }
        socket.on('start',data=>{
            console.log('started',data)
        })
    },[])
    useEffect(()=>{
        let fList= thisLeague.available.filter(item=>{
            if(item.name.toLowerCase().includes(fValue.toLowerCase())){
                return item
            }
           
        })
        setDlist(fList)
    },[fValue,thisLeague.available])
    const beginDraft=()=>{
        DraftApi.startDraft(thisLeague)
    }
    // const endDraft=()=>{
    //     let room={room:thisLeague._id}
    //     // socket.emit('startDraft',room)
    //     DraftApi.endDraft(thisLeague)
    // }
    const forcePick=()=>{
        console.log(thisLeague.users)
        // if(){

        // }
        // DraftApi.adminForcePick()
    }
    const handlepick= async (e,player)=>{
        e.preventDefault();
        console.log(e.target.name)
        let currentL=thisLeague.available
        const index = await currentL.findIndex(el=>el.name===e.target.name)
        console.log(index)
        console.log(thisLeague.currentTurn)
        let newTurn=thisLeague.currentTurn+1
        let took=currentL[index]
        // setTaken(took)
        currentL.splice(index,1)
        console.log(currentL)
        // setAvail(currentL)
        // setDlist(currentL)
        // console.log('user' + user.email)
        // console.log(thisLeague._id,user._id, user.email, player, newTurn )
        // DraftApi.makePick(player,draft._id,user._id, user.email,available,picked,newTurn)
    }
  
    return(
        <div className= 'admin'>
            <Row>
                <Row>
                {thisLeague.status!=='active'?
                    <>
                    <Col s={12}>
                        <Button onClick={beginDraft}>Start Draft</Button>
                    </Col>
                    <Col s={12}>
                        <Button onClick={()=>{!showReorder?setShowReorder(true):setShowReorder(false)}}>Change Order</Button>
                    </Col>
                    </>
                    : 
                   null 
                } 
                </Row>
                <Row>
                    {showReorder?<Reorder order={thisLeague.teams}/>:null}
                </Row>
                {/* {showReorder?<Reorder order={thisLeague.teams}/>:null} */}
                <Col s={12}>
                    <label className='adLabel'>Make Selection</label>
                    <input onChange={(e)=>{setFvalue(e.target.value)}}></input> 
                    <table>
                        <tbody>
                    {dList?dList.map((player, i)=>{
                        return (
                            <tr key={i}>
                                <td className='tableN'>
                            <Modal
                                        actions={[
                                            <Row>
                                                <Col s={6}>
                                                <Button flat modal="close" id ='primaryBtn' node="button" >Cancel</Button>
                                                </Col>
                                                <Col s={6}>
                                                <Button flat modal="close" className='btn'node="button"  value={player.id} name={player.name} onClick={(e)=>{handlepick(e,player)}}>Draft</Button>
                                                </Col>
                                            </Row>
                                        ]}
                                        header={`Are you sure you want ${player.name}?`}
                                        id="modal1"
                                        open={false}
                                        options={{ 
                                            inDuration: 250,
                                            opacity: 0.5,
                                            outDuration: 250,
                                            preventScrolling: true
                                        }}     
                                        trigger={<Button disabled={!active?false:true}node="button">{player.name}</Button>}
                                        >
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Team: {player.team}</td><td>POS: {player.pos}</td><td>Bye: {player.bye}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Modal>
                                {/* <Button disabled={status?false:true}  onClick={(player)=>{handleSelectP(player)}} >{player.name}</Button> */}
                            </td>
                                <td>Team: {player.team}</td><td >Bye: {player.bye}</td>
                            </tr>   
                        )
                    }):null}  
                    </tbody>
                    </table>
                    <button onClick={forcePick()}></button>
                </Col>
                <Col s={12}>  
                </Col>
            </Row>
        </div>
    )
}
export default AdminControls
