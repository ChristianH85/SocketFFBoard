import React, {useState,useEffect} from 'react'
import {Row, Col} from 'react-materialize'
function MessageBox(props){
    const[msgs, setMsgs]= useState([])
    useEffect(()=>{
        console.log(props.msgL)
        setMsgs(props.msgL)
    }, [props.msgL])
    return(
        <div className='msgbox'>
                        {msgs? msgs.map((data,i)=>{
                            // console.log(data)
                            if(data.userId===props.userInfo._id){
                                return (
                                    <div className='msgS msg'key={i}>
                                        <Row>
                                        <h5>{data.msg} </h5>
                                        </Row>
                                        <hr/>
                                        <Row>
                                            <Col s={6}>
                                            <p className='time'>{data.time.toString()}</p>
                                            </Col>
                                            <Col s={6}>
                                            <h6 className='userN'> {data.username.toString()}</h6>
                                            </Col>
                                        </Row>
                                    </div>)
                            }else{return (
                                <div className='msgR msg'key={i}>
                                    <Row>
                                        <h5>{data.msg} </h5>
                                    </Row>
                                        <hr/>
                                     <Row>
                                        <Col s={6}>
                                            <p className='time'>{data.time.toString()}</p>
                                        </Col>
                                        <Col s={6}>
                                            <h6 className='userN'> {data.username.toString()}</h6>
                                        </Col>
                                    </Row>
                                </div>)}

                        }):<h6>No Messages Yet</h6>}
                    </div>
    )
}
export default MessageBox