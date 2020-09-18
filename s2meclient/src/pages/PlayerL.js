import React,{useState, useEffect} from 'react'
import {Card, Row, Col,Textarea, Button, Tabs, Tab, Table} from 'react-materialize'

function PlayerList(){
    const [available, setAvail]=useState([])
    const [picked, setTaken] = useState([])
    return(<>
        <Table>
            <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>Bye Week</th>
            <th>Team</th>
            </tr>
        </Table>
    </>)
}
export default PlayerList