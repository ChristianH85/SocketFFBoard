import React,{useState, useEffect} from 'react'
import {Button, Table, Modal,Row, Col} from 'react-materialize'
import DraftApi from '../helpers/draft'
function PlayerList(props){
    const{status,draft,updateDraft,updateUser,user}=props
    const [available, setAvail]=useState([])
    const [picked, setTaken] = useState({})
    // const [left, setLeft]=useState(players.length)
    const [dList, setDList]= useState([])

    
    useEffect(()=>{
        console.log(draft)
        setAvail(draft.available)
        setDList(draft.available)
        console.log('change')
    },[draft.available])
    const handlepick= async (e,player)=>{
        e.preventDefault();
        let currentL=available
        const index = await currentL.findIndex(el=>el.name===e.target.name)
        
        let took=currentL[index]
        console.log(took)
        // setTaken(took)
         currentL.splice(parseInt(index),1)
        console.log(currentL)
        // setAvail(currentL)
        // setDList(currentL)
        // console.log(draft._id,user._id, user.email, player, newTurn )
        DraftApi.makePick(player,draft._id,user._id, user.email,currentL,picked,draft.currentTurn)
    }
    const filterList=async(val)=>{
        let list=available
        if(val==='ALL'){
            setDList(available)
        }else{
            console.log(list, val)
        let fList= await list.filter(item=>item.pos===val)
            setDList(fList)       
        }
    }
    const handleSort=async(filter)=>{
        let list=dList
        switch(filter){
            case 'bye':
                let sList= await list.sort(function (a, b) {
                    return a.bye - b.bye;
                  })
                  console.log(sList)
                  setDList(sList)
                  break;
            case 'rank':
                let sRList= await list.sort(function (a, b) {
                    return a.rank - b.rank;
                  })
                  console.log(sRList)
                  setDList(sRList)
                  break;
        }

    }
    const handleList=(e)=>{
        e.preventDefault();
        let action=e.target.id
        switch(action){
            case 'rank':
                handleSort('rank')
                break;
            case 'pos':
                filterList( e.target.value)
                break;
            case 'bye':
                console.log('bye')
                handleSort( 'bye')
                break;    
        }
    }
    return(<>
    <form className='pcard'>
        <Table hoverable={true} centered={true}>
            <thead className='headRow'>
            <tr >
            <th >Name</th>
            <th ><Button onClick={handleList} className='player-btn'>Rank</Button></th>
            <th ><select onChange={handleList} className="browser-default" id='pos'><option>ALL</option><option>QB</option><option>WR</option><option>RB</option><option>TE</option><option>DEF</option><option>K</option>POS</select></th>
            <th ><Button onClick={handleList} className='player-btn'>Bye</Button></th>
            <th >Team</th>
            </tr>
            </thead>
            <tbody>
                
            {dList?dList.map((player,i)=>{
                return(
                <tr id={player.id} key={player.rank}>
                    <td className='tableN'>
                    <Modal
                                actions={[
                                    <Row>
                                        <Col s={6}>
                                        <Button flat modal="close" id ='primaryBtn' className='player-btn'node="button" >Cancel</Button>
                                        </Col>
                                        <Col s={6}>
                                        <Button flat modal="close" node="button"  value={player.id} name={player.name} onClick={(e)=>{handlepick(e,player)}}>Draft</Button>
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
                                trigger={<button disabled={status?false:true} name='whatabuda' className='player-btn' node="button">{player.name}</button>}
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
                    <td className='tableSec'>{player.rank}</td>
                    <td className='tableSec'>{player.pos}</td>
                    <td className='tableSec'>{player.bye}</td>
                    <td className='tableSec'>{player.team}</td>
                </tr>
                )
            }):null}  
            </tbody>            
        </Table>
    </form>        
    </>)
}
export default PlayerList