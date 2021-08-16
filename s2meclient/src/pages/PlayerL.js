import React,{useState, useEffect} from 'react'
import {Button, Table, Modal,Row, Col} from 'react-materialize'
import players from './fakePlist'
import DraftApi from '../helpers/draft'
function PlayerList(props){
    const{status,draft,updateDraft,updateUser,user}=props
    const [available, setAvail]=useState(draft.available)
    const [picked, setTaken] = useState({})
    // const [left, setLeft]=useState(players.length)
    const [dList, setDList]= useState(draft.available)
    // const [selected,setSelected]= useState('')
    // const[show,setShow]= useState(false)
    

    const handlepick= async (e,player)=>{
        e.preventDefault();
        console.log(e.target.name)
        let currentL=available
        
        const index = await currentL.findIndex(el=>el.name===e.target.name)
        console.log(index)
        console.log(draft.currentTurn)
        let newTurn=draft.currentTurn+1
        let took=currentL[index]
        setTaken(took)
        currentL.splice(index,1)
        console.log(currentL)
        setAvail(currentL)
        // document.getElementById(e.target.name).remove()
        // updateDraft(draft.draftOrder.splice(0,1))
        console.log(draft._id,user._id, user.email, player, newTurn )
        DraftApi.makePick(player,draft._id,user._id, user.email,available,picked,newTurn)
    }
    // const dispPLIst=()=>{
    //     dList.map((player)=>{
    //         return(
    //         <tr>
    //             <td className='tableN'><Button className='pbutt' name={player.name} onClick={(e)=>handlepick(e,player)} value={player.id}>{player.name}</Button></td>
    //             <td className='tableSec'>{player.rank}</td>
    //             <td className='tableSec'>{player.bye}</td>
    //             <td className='tableSec'>{player.team}</td>
    //             {/* <td className='tableSec'>{player.pos}</td> */}
    //         </tr>
    //     )})
    // }
    const pickPlayer=(e)=>{

    }
    useEffect(()=>{
        console.log('change')
    },[dList])
    const filterList=async(val)=>{
        let list=available
        if(val==='ALL'){

            setDList(available)
        }else{
            console.log(list, val)
        let fList= await list.filter(item=>item.pos===val)
            setDList(fList)
            
        }
        // console.log(list, val)
        // let fList= await list.filter(item=>item.pos===val)
        // console.log(fList)
    }
    // const handleSelectP=(player)=>{
    //     setSelected(player)
    //     setShow(true)
    // }
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
          
          // sort by value
        //  const sList= await list.sort(function (a, b) {
        //     return a.bye - b.bye;
        //   })
        //   console.log(sList)
    //     let list=available
    //     console.log(filter)
    //    let newL= await list.sort((a, b) =>{
    //    return a.name > b.name});
    //    console.log(newL)
    //    setDList(newL)
    }
    const handleList=(e)=>{
        e.preventDefault();
        console.log(e.target.value)
        let action=e.target.id
        // let list=dList
        switch(action){
            case 'rank':
                handleSort('rank')
                // console.log(handleSort(list))
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
            <th ><Button onClick={handleList} id='rank'>Rank</Button></th>
            <th ><select onChange={handleList} className="browser-default" id='pos'><option>ALL</option><option>QB</option><option>WR</option><option>RB</option><option>TE</option><option>DEF</option><option>K</option>POS</select></th>
            <th ><Button onClick={handleList} id='bye'>Bye Week</Button></th>
            <th >Team</th>
            </tr>
            </thead>
            {/* <div className='headsSep'></div> */}
            <tbody>
                
            {dList?dList.map((player,i)=>{
                return(
                <tr id={player.id} key={player.rank}>
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
                                trigger={<Button disabled={status?false:true}node="button">{player.name}</Button>}
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
        {/* <Modal
                        actions={[
                        <Button flat modal="close" onClick={()=>{setShow(false)}} waves="green">Close</Button>,
                        <Button className='pbutt' onClick={(e)=>{handlepick(e,selected)}} name={selected.id} value={selected.name}>{selected.name}</Button>
                        ]}
                        bottomSheet={false}
                        fixedFooter={false}
                        header={`Are you sure you want ${selected.name}?`}
                        id="modal1"
                        open={show}
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>{selected.team}</td><td>{selected.pos}</td><td>{selected.bye}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal>     */}
    </form>
        
    </>)
}
export default PlayerList