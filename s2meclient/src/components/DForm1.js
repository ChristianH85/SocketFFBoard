import React from 'react';
import { Row, Col, Button } from 'react-materialize';

function DForm1(props){
    const next=(e)=>{
        e.preventDefault();
        props.setForm("LeagueInfo")
    }
    return(
       <Row>
           <form id='leagueForm'>
               {/* <Row> */}
                    {/* <Col s={12} m={8} offset='m2' > */}
                    <Row>
                        <Col s={10} m={8} offset='s1 m2' >
                            <label className='formL'>League Name:</label>
                            <input label='League Name' className='center-align formI' name="setLName" onChange={props.handleInput} value={props.leagueName}></input>
                        </Col>
                    </Row>
                        
                    {/* </Col> */}
                    <Row>
                        <Col s={10} m={8} offset='s1 m2' >
                            <label className='formL'>Draft Date:</label>
                            <input type='date' id='date1' className='formI' onChange={props.handleDate}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={10} m={8} offset='s1 m2' >
                        <label className='formL'>Draft Time:</label>
                        <input type='time'className='formI' id='date2'onChange={props.handleDate}/>
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
export default DForm1