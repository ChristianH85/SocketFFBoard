import React from 'react'
import {Select} from 'react-materialize'
const DropMenu=(props)=>{
    const handleSelect=async(e)=>{
        console.log(e.target.name,e.target.value)
        // setArr(order,e.target.name,e.target.value)
        let arr=setArr(props.order,e.target.name,e.target.value)

        props.setOrder(arr)
    }
    const setArr=(order,i,val)=>{
        let temp= order
        temp[parseInt(i)]=val
        console.log(temp)
        return temp
    }

    return (
        <Select name={props.i} onChange={(e)=>{handleSelect(e)}}>
            <option  default value='none'>Choose #{parseInt(props.i)+1} Pick</option>
            {props.mOrder?props.mOrder.map((player,i)=>{
            return <option key={i} value={player}>{player}</option>
            }):null}
        </Select>
    )
}
export default DropMenu