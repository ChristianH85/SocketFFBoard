import React,{useState,useEffect} from 'react'
import {Select} from 'react-materialize'
import DraftApi from '../helpers/draft'
const DropMenu=(props)=>{
    const [order,setOrder]=useState([])
    const handleSelect=async(e)=>{
        // console.log(e.target.name,e.target.value)
        // setArr(order,e.target.name,e.target.value)
        let arr= setArr(order,e.target.name,e.target.value)
        let newOrder= DraftApi.snake(arr, props.rounds)
        setOrder(newOrder)
        // console.log(order)
        props.setOrder(arr)
    }
    const setArr=(order,i,val)=>{
        let temp= [8]
        temp.splice(i,1,val)
        setOrder(temp)
        // console.log(temp)
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