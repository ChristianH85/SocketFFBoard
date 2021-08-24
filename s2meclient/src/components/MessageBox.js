import React, {useState,useEffect} from 'react'
import {Row, Col} from 'react-materialize'
import {FFDB} from '../images/FFDB.png'
function MessageBox(props){
    const[msgs, setMsgs]= useState([])
    useEffect(()=>{
        // console.log(props.msgL)
        setMsgs(props.msgL)
        var el = document.getElementById("scroller");
            el.scrollTop = el.scrollHeight;
    }, [props.msgL])
    useEffect(()=>{
        const el = document.getElementById("scroller");
            el.scrollTop = el.scrollHeight;
    }, [])
    return(
        <div className='msgbox'>
            <div id="scroller">
                        {msgs? msgs.map((data,i)=>{
                            // console.log(data)
                            if(data.userId===props.userInfo._id){
                                let date=new Date(data.time)
                                return (
                                    <div className='msgS msg'key={i}>
                                        <Row>
                                            <Col s={3}>
                                                <img className='avatar' src={props.userInfo.avatar||FFDB} alt={FFDB}/>
                                            </Col>
                                            <Col s={9}>
                                                <h6>{data.msg} </h6>
                                            </Col>
                                        
                                        </Row>
                                        <hr/>
                                        <Row>
                                            <Col s={6}>
                                            <p className='time'>{date.toLocaleTimeString('en-US')}</p>
                                            </Col>
                                            <Col s={6}>
                                            <p className='userN'> {data.username.toString()}</p>
                                            </Col>
                                        </Row>
                                    </div>)
                            }else{return (
                                <div className='msgR msg'key={i}>
                                     <Row>
                                            <Col s={3}>
                                                <img className='avatar' src={data.avatar||FFDB} alt={FFDB}/>
                                            </Col>
                                            <Col s={9}>
                                                <h6>{data.msg} </h6>
                                            </Col>
                                        
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
                        <div id="anchor"></div>
                        </div>
                    </div>
    )
}
export default MessageBox