import React, {useState} from 'react'
import { Row} from 'react-materialize'
import {user} from '../Atoms'
import {useAtom} from 'jotai'
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import DForm1 from '../components/DForm1.js'
import DForm2 from '../components/DForm2'
import DForm3 from '../components/DForm3'
import adminFn from '../helpers/draft'
function LeagueOptions(){
    const[commish, setComm]= useAtom(user)
    const [leagueName, setLName]=useState('')
    const [numP, setLNumP]=useState(0)
    const [date1, setD1]= useState('')
    const [date2, setD2]= useState('')
    const [lEmails, setEmails]=useState([])
    const [eList, setEList]=useState([])
    const [rounds,setRounds]=useState(0)
    const [form, setForm ]=useState('')
    const history=useHistory()
    const handleOption=(e)=>{
        let val= e.target.value
        let emails = eList
            emails.length=val
            emails[0]=commish.email
            console.log(emails)
        setEmails(emails)
        if(eList.length>0){
        console.log(eList)}
        setLNumP(val)
    }
    const next =(name)=>{
        setForm(name)
    }
    const dispForm=()=>{
        let dForm=form
        switch(dForm){
            case "LeagueName":
                return   
            case "LeagueInfo":
                return<DForm2 setForm={next} numP={numP} handleOption={handleOption} handleInput={handleInput} />
            case "Players":
                return<DForm3 setUp={setUpLeage} lEmails={lEmails} setForm={next} numP={numP} handleEmailCh={handleEmailCh}/>
            case "Settings":
                return  
            default:
                return<DForm1  setForm={next} handleInput={handleInput} leagueName={leagueName} handleDate={handleDate} />      
        }
    }
    const handleInput=(e)=>{
        let val= e.target.value
        let name=e.target.name
        if(name==="setLName"){
            setLName(val)
        }
        else if(name==="setPNum"){
        // console.log(val)
            setLNumP(val)
        }
        else if(name==="rounds"){
            // console.log(val)
                setRounds(parseInt(val))
            }
    }
  
  const handleDate = (e) => {
    let id = e.target.id;
    let val = e.target.value;

    if (id === "date1") {
      // let date=new Date(val)
      setD1(val);
    } else if (id === "date2") {
      setD2(val);
    }
  };

  const handleEmailCh = (e) => {
    e.preventDefault();
    let email = e.target.value;
    let index = e.target.id;
    const list = eList;
    list[index] = email;
    setEList(list);
    console.log(email + " \n" + index);
  };
  const setUpLeage = async (e) => {
    e.preventDefault();
    let date = new Date(`${date1}T${date2}`).toISOString();
    // let date12= new Date(date.toString())
    console.log(date);
    let order = await adminFn.snake(eList,rounds);
    console.log(order)
    let lObj = {
      leagueName: leagueName,
      draftTime: date,
      currentTurn: 1,
      status:'pending',
      teams: eList,
      numbTeams: numP,
      numbRounds: rounds,
      commish: commish._id,
      draftOrder: order,
    };
    console.log(lObj);
    axios.post("/api/league/", lObj).then((res) => {
      console.log(res);
      history.push('/')
    });

  };

  // const snake = () => {
  //   const order = [];
  //   console.log(rounds);
  //   for (let i = 1; i <= rounds; i++) {
  //     if (i % 2 !== 0) {
  //       const nOrder = eList;
  //       console.log(nOrder);
  //       nOrder.forEach((team) => order.push(team));
  //     } else if (i % 2 === 0) {
  //       const rOrder = eList.reverse();
  //       rOrder.forEach((team) => order.push(team));
  //       console.log(rOrder);
  //     }
  //   }
  //   console.log();
  //   return order;
  // };
  return(
    <Row>
        {dispForm()}
    </Row>
)   
}
export default LeagueOptions;
