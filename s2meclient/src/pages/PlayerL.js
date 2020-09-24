import React,{useState, useEffect} from 'react'
import {Card, Row, Col,Textarea, Button, Tabs, Tab, Table} from 'react-materialize'
import players from './fakePlist'
function PlayerList(){
    const [available, setAvail]=useState(players)
    const [picked, setTaken] = useState([])

    const handlepick=(e)=>{
        e.preventDefault();
        // let ruSure= confirm('are you sure')
        // console.log(ruSure)
        let currentL=available
        let took=picked
        const index = currentL.map(data => data.name).indexOf(e.target.value)
        took.push(currentL[index])
        setTaken(took)
        currentL.splice(index,1)
        console.log(currentL)
        setAvail(currentL)
        
    }
    useEffect(()=>{
        
    })
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
                {/* <tr></tr> */}
            {available.map((player)=>{
                return(
                <tr>
                    <td className='tableN'><Button className='pbutt' onClick={handlepick} value={player.name}>{player.name}</Button></td>
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