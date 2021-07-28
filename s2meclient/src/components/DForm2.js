import React from 'react';
import { Row, Col, Button, Select } from 'react-materialize';

function DForm2(props){
    const next=(e)=>{
        e.preventDefault();
        props.setForm("Players")
    }
    return(
       <Row>
           <form id='leagueForm'>
               {/* <Row> */}
                    {/* <Col s={12} m={8} offset='m2' > */}
                    <Row>
                        <Col s={10} m={8} offset='s1 m2' >
                            <label className='formL'>Total Rounds</label>
                            <input className='formI' type="number" min="1" max="20" name="rounds" onChange={props.handleInput}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={6} m={3} offset='s3 m2' className='formI'>
                            <Select
                                label='# of Players' 
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
                                }} value={props.numP.toString()} onChange={props.handleOption}>
                                <option disabled value=""># of players</option>
                                {[...Array(12)].map((u,i)=>{
                                    let x=i+1
                                    return(
                                        <option key={x.toString()} value={x.toString()}>{x}</option>
                                    )
                                })}
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={10} m={8} offset='s1 m2' >
                        <label className='formL'>Draft Time:</label>
                        <input className='formI' type='time' id='date2'onChange={props.handleDate}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={8} offset='s2'>
                            <Button onClick={next}>Next</Button>
                        </Col>
                    </Row>
               {/* </Row> */}
           </form>
       </Row> 
    )

}
export default DForm2