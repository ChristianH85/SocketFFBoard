import React, {useState} from 'react'
import {TextInput, Button, Select, Col, Row} from 'react-materialize'
import {user} from '../Atoms'
import {useAtom} from 'jotai'
import socket from '../socketConfig'
import axios from 'axios'
function LeagueOptions(){
    const[commish, setComm]= useAtom(user)
    const [leagueName, setLName]=useState('')
    const [numP, setLNumP]=useState(0)
    const [date1, setD1]= useState('')
    const [date2, setD2]= useState('')
    const [lEmails, setEmails]=useState('')
    const [eList, setEList]=useState([])
    // const [pNum, setPNum]=useState('')
    let [rounds,setRounds]=useState(0)
    let [ePlayers, setEPlay]=useState(12)
    const handleOption=(e)=>{
        let val= e.target.value
        setEmails(Array(parseInt(val)))
        // const emailList=Array(parseInt(val))
        if(lEmails.length>0){
        console.log(lEmails)}
        setLNumP(val)
    }
    const handleInput=(e)=>{
        let val= e.target.value
        let name=e.target.name
        if(name==="setLName"){
            setLName(val)
        }
        else if(name==="setPNum"){
        console.log(val)
            setLNumP(val)
        }
        else if(name==="rounds"){
            console.log(val)
                setRounds(val)
            }
    }
    const handleDate=(e)=>{
        let id=e.target.id
        let val= e.target.value

        if(id==='date1'){
            // let date=new Date(val)
            setD1(val)
        }else if(id==='date2'){
            setD2(val)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        let lObj={
            leagueName:leagueName,
            commish:commish,
            date: date1+" "+date2,
        }
        socket.emit('Nleague', lObj)
    }
    const setList=(list)=>{
        console.log(list)
        // let nList=list.map((data)=>{data=null})
        // setEList(list)
    }
    
    const handleEmailCh=(e)=>{
        e.preventDefault();
        let email= e.target.value;
        let index=e.target.id
        const list= eList
        
        // let tList=list.map((data)=>{data=null})
        list[index]=email
        
        // let upList= list
        console.log(list)

        setList(list) 
        console.log(email+" \n"+index)

    }
    const setUpLeage=(e)=>{
        e.preventDefault()
        console.log(commish.data._id)
        let lObj={
            leagueName: leagueName,
            draftTime: date1+" "+date2,
            // time: date2,
            teams: eList,
            commish: commish.data._id
        }
        axios.post('/api/league/',lObj).then(res=>console.log(res))
    }
    // console.log(emailList)
    return(
        <Row>
        <Col s={12} m={8} offset='m2' className='leagueForm'>
            <form >
                <Row>
                    <Col s={12} m={6} >
                        <TextInput label='League Name' name="setLName" onChange={handleInput} value={leagueName}></TextInput>
                    </Col>
                    <Col s={6} m={3}>
                        <label>Draft Date:</label>
                        <input type='date' id='date1' onChange={handleDate}/>
                    </Col>
                    <Col s={6} m={3}>
                        <label>Draft Time:</label>
                        <input type='time' id='date2'onChange={handleDate}/>
                    </Col>
                    <Col s={6} m={3}>
                    <Select
                    // id="Select-9"
                    label='# of players' 
                    multiple={false}
                    options={{
                        classes: '',
                        dropdownOptions: {
                        alignment: 'left',
                        autoTrigger: true,
                        closeOnClick: true,
                        constrainWidth: true,
                        coverTrigger: true,
                        hover: false,
                        inDuration: 150,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 250
                        }
                    }} value={numP.toString()} onChange={handleOption}>
                    <option disabled value=""># of players</option>
                    {[...Array(12)].map((u,i)=>{
                        let x=i+1
                        return(
                            <option key={x.toString()} value={x.toString()}>{x}</option>
                        )
                    })}
                    {/* <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option> */}
                    </Select>
                    </Col>
                    <Col s={6} m={3}>
                        <TextInput label="Total Picks" name="rounds" onChange={handleInput}></TextInput>
                    </Col>
                    
                    </Row>
                    <Row>
                        {numP>1?[...Array(parseInt(numP))].map((u,i)=>{
                        // console.log(u,i)
                        let x=i+1
                        return(
                            <Col s={6} m={4} key={i.toString()}>
                            <TextInput label={"Player Email # "+x.toString()} id={i.toString()} type="email" onChange={handleEmailCh}></TextInput>
                            <Button>Add</Button>
                            </Col>
                        )}
                        ):<div></div>}
                    </Row>                
                <Button onClick={setUpLeage}>Create League</Button>
            </form>
        </Col>
        </Row>
    )
    
}
export default LeagueOptions