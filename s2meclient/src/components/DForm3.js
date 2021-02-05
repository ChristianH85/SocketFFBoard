import React from 'react';
import { Row, Col, Button, Select } from 'react-materialize';

function DForm3(props){
    const next=(e)=>{
        e.preventDefault();
        props.setForm("Players")
    }
    return(
       <Row>
           <form className='leagueForm '>
               <Col s={6} offset='s3'>
                   <h2>Emails:</h2>
               </Col>
                {props.numP>1?[...Array(parseInt(props.numP))].map((u,i)=>{
                        // console.log(u,i)
                let x=i+1
                        
                return(
                     <Col s={6} m={4} key={i.toString()}>
                        {i===0?
                        <input label={"Commissioner"} id={(i).toString()} type="email" value={props.lEmails[0]} disabled={true}></input>:
                        <input label={"Player Email # "+x.toString()} id={(i).toString()} type="email" onChange={props.handleEmailCh}></input>}
                    </Col>
                        )}
                ):<div></div>} 
                <Row>
                    <Col s={8} offset='s2'>
                        <Button onClick={next}>Next</Button>
                    </Col>
                </Row>
           </form>
       </Row> 
    )

}
export default DForm3