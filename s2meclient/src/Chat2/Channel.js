import React,{useState, useEffect} from 'react';

function Channel(props){

    return(
    <>
    <div classname="channel-item"></div>
‍
        <div>{props.name}</div>
‍
        <span>{props.participants}</span>
‍
    </>
    )
}
export default Channel