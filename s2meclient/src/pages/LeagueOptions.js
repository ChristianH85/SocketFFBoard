import React, { useState, useEffect} from "react";
import { TextInput, Button, Select, Col, Row } from "react-materialize";
import { user } from "../Atoms";
import { useAtom } from "jotai";
import socket from "../socketConfig";
import axios from "axios";
import { Link } from "react-router-dom";

function LeagueOptions() {
  const [commish, setComm] = useAtom(user);
  const [leagueName, setLName] = useState("");
  const [numP, setLNumP] = useState(0);
  const [date1, setD1] = useState("");
  const [date2, setD2] = useState("");
  const [lEmails, setEmails] = useState([]);
  const [eList, setEList] = useState([]);
  const [rounds, setRounds] = useState(0);
  const [ePlayers, setEPlay] = useState(12);
  const [dType, setDtype] = useState("Snake");
  const [date,setDate]=useState('12')

  useEffect(() =>{today()},[] )

  const handleOption = (e) => {
    let val = e.target.value;
    let emails = eList;
    emails.length = val;
    emails[0] = commish.email;
    console.log(emails);
    setEmails(emails);
    if (eList.length > 0) {
      console.log(eList);
    }
    setLNumP(val);
  };
  const handleInput = (e) => {
    let val = e.target.value;
    let name = e.target.name;
    if (name === "setLName") {
      setLName(val);
    } else if (name === "setPNum") {
      console.log(val);
      setLNumP(val);
    } else if (name === "rounds") {
      console.log(val);
      setRounds(parseInt(val));
    }
  };
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
    let date = new Date(date1 + "T" + date2).toISOString();
    // let date12= new Date(date.toString())
    console.log(date);
    let order = await snake();
    let lObj = {
      leagueName: leagueName,
      draftTime: date,
      // rounds: rounds,
      status:'pending',
      teams: eList,
      numbTeams: numP,
      numbRounds: rounds,
      commish: commish._id,
      draftType: dType,
      draftOrder: order,
    };
    console.log(lObj);
    axios.post("/api/league/", lObj).then((res) => {
      console.log(res);
    });
  };

  const snake = () => {
    const order = [];
    console.log(rounds);
    for (let i = 1; i < rounds; i++) {
      if (i % 2 !== 0) {
        const nOrder = eList;
        console.log(nOrder);
        nOrder.forEach((team) => order.push(team));
        // setDraftOrder(prev=>[...prev, nOrder])
      } else if (i % 2 === 0) {
        const rOrder = eList.reverse();
        rOrder.forEach((team) => order.push(team));
        console.log(rOrder);
      }
    }
    console.log();
    return order;
  };
  const handleType = (e) => {
    let draftType = e.target.value;
    setDtype(draftType);
  };
  const today=()=>{
    let day = new Date();
    let minDate = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();
    console.log(minDate)
    setDate(minDate)
  }
  return (
    <Row>
      <Col s={12} m={8} offset="m2" id="leagueForm">
        <form>
          <Row>
            <Col s={12} m={6} offset="m3">
            <label className='formL'> Draft Date: </label>
              <input
                className='formI'
                name="setLName"
                onChange={handleInput}
                value={leagueName}
              />                
            </Col>
            </Row>
            <Row>
            <Col s={12} m={4} offset="m4">
              <label className='formL'> Draft Date: </label>
              <input type="date" className='formI' id="date1" min={date} onChange={handleDate} />
            </Col>
            </Row>
            <Row>
            <Col s={12} m={4} offset="m4">
              <label className='formL'> Draft Time: </label>
              <input type="time" className='formI' step="900" id="date2" onChange={handleDate} />
            </Col>
            </Row>
            <Row>
            <Col s={12} m={4}  offset="m4">
              <div>
                <label className='formL'> Total Rounds </label>
                <input
                className='formI'
                  type="number"
                  min="1"
                  max="20"
                  name="rounds"
                  onChange={handleInput}
                />
              </div>
            </Col>
            </Row>
            <Row>
            <Col s={12} m={4} offset="m4" className='formI'>
            <label className='formL'>Draft Type</label>
              <Select
                multiple={false}
                options={{
                  classes: "",
                  dropdownOptions: {
                    alignment: "left",
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
                    outDuration: 250,
                  },
                }}
                value={dType.toString()}
                onChange={handleType}
              >
                <option value="Snake"> Snake </option>
                <option disabled value="Auction">
                  
                  Auction
                </option>
              </Select>
            </Col>
            </Row>
            <Row>
            <Col s={12} m={4} offset="m4" className='formI'>
              <label className='formL'># of Players</label>
              <Select
                multiple={false}
                options={{
                  classes: "",
                  dropdownOptions: {
                    alignment: "left",
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
                    outDuration: 250,
                  },
                }}
                value={numP.toString()}
                onChange={handleOption}
              >
                <option disabled value="">
                  
                  # of players
                </option>
                {[...Array(12)].map((u, i) => {
                  let x = i + 1;
                  return (
                    <option key={x.toString()} value={x.toString()}>
                      
                      {x}
                    </option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row>
            
            {numP > 1 ? (
              [...Array(parseInt(numP))].map((u, i) => {
                // console.log(u,i)
                let x = i + 1;

                return (
                  <Col s={6} m={4} key={i.toString()}>
                    
                    {i === 0 ? (
                      <>
                      <label className='formL'>Commissioner</label>
                      <input
                        className='formI'
                        id={i.toString()}
                        type="email"
                        value={lEmails[0]}
                        disabled={true}
                      />
                        
                      </>
                    ) : (
                      <input
                        className='formI'
                        label={"Player Email # " + x.toString()}
                        id={i.toString()}
                        type="email"
                        onChange={handleEmailCh}
                      />
                    )}
                  </Col>
                );
              })
            ) : (
              <div> </div>
            )}
          </Row>
          <Link to="/draft">
            
            <Button onClick={setUpLeage}> Create League </Button>
          </Link>
        </form>
      </Col>
    </Row>
  );
}
export default LeagueOptions;
