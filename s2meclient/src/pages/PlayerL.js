import React,{useState, useEffect} from 'react'
import {Card, Row, Col,Textarea, Button, Tabs, Tab, Table} from 'react-materialize'
import players from './fakePlist'
function PlayerList(){
    const [available, setAvail]=useState(players)
    const [picked, setTaken] = useState([])
    const [left, setLeft]=useState(players.length)
    const handlepick=(e)=>{
        e.preventDefault();
        // let ruSure= confirm('are you sure')
        // console.log(ruSure)
        let currentL=available
        let took=picked
        const index = currentL.map(data => data.id).indexOf(e.target.value)
        took.push(currentL[index])
        setTaken(took)
        currentL.splice(index,1)
        console.log(currentL)
        setAvail(currentL)
        document.getElementById(e.target.name).remove()
        
    }
    const dispPLIst=()=>{
        available.map((player)=>{
            return(
            <tr>
                <td className='tableN'><Button className='pbutt' onClick={handlepick} value={player.id}>{player.name}</Button></td>
                <td className='tableSec'>{player.rank}</td>
                <td className='tableSec'>{player.bye}</td>
                <td className='tableSec'>{player.team}</td>
            </tr>
        )})
    }
    const pickPlayer=(e)=>{

    }
    useEffect(()=>{
        
    },[available])
    return(<>
    <Card className='pcard'>
        <Table hoverable='true' centered='true'>
            <tr className='headRow'>
            <th >Name</th>
            <th >Rank</th>
            <th >Bye Week</th>
            <th >Team</th>
            </tr>
            {/* <div className='headsSep'></div> */}
            <tbody>
                
            {available.map((player)=>{
                return(
                <tr id={player.id}>
                    <td className='tableN'><Button className='pbutt' onClick={handlepick} name={player.id} value={player.name}>{player.name}</Button></td>
                    <td className='tableSec'>{player.rank}</td>
                    <td className='tableSec'>{player.bye}</td>
                    <td className='tableSec'>{player.team}</td>
                </tr>
                )
            })}  
            </tbody>
            
        </Table>
    </Card>
        
    </>)
}
export default PlayerList