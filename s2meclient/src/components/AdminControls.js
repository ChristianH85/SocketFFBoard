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
    },[thisLeague.status])
    useEffect(()=>{
        let fList= thisLeague.available.filter( item=>{
            return item.name.toLowerCase().includes(fValue.toLowerCase())?item:null
        })
        setDlist(fList)
    },[fValue,thisLeague.available])
    const beginDraft=()=>{
        DraftApi.startDraft(thisLeague)
    }
    const userTurn=async()=>{
        const username=thisLeague.draftOrder[thisLeague.currentTurn-1]
        console.log(username)
        let user=  thisLeague.users.filter(user=>{return user.username===username})        
       return user[0]
    }
    const handlepick= async (e,player)=>{
        e.preventDefault();
        let userCurr = await userTurn();
        console.log(userCurr)
        let currentL=thisLeague.available
        const index = await currentL.findIndex(el=>el.name===player.name)
        currentL.splice(index,1)
        DraftApi.makePick(player,thisLeague._id,userCurr._id, userCurr.email,userCurr.username,currentL,thisLeague.currentTurn)
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
                                                <Button flat modal="close" className='btn'node="button"value={player.id} name={player.name} onClick={(e)=>{handlepick(e,player)}}>Draft</Button>
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
                                        trigger={<Button disabled={active?false:true}className='btn' onClick={()=>{handlepick(player)}} node="button">{player.name}</Button>}
                                        >
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Team: {player.team}</td><td>POS: {player.pos}</td><td>Bye: {player.bye}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Modal>
                            </td>
                                <td>Team: {player.team}</td><td >Bye: {player.bye}</td>
                            </tr>   
                        )
                    }):null}  
                    </tbody>
                    </table>
                </Col>
                <Col s={12}>  
                </Col>
            </Row>
        </div>
    )
}
export default AdminControls
