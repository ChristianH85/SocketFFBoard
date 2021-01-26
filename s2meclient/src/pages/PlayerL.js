import React,{useState, useEffect} from 'react'
import {Button, Table} from 'react-materialize'
import players from './fakePlist'
function PlayerList(){
    const [available, setAvail]=useState(players)
    const [picked, setTaken] = useState([])
    const [left, setLeft]=useState(players.length)
    const [dList, setDList]= useState(available)
    const handlepick=(e)=>{
        e.preventDefault();
        // let ruSure= confirm('are you sure')
        // console.log(ruSure)
        let currentL=available
        let took=picked
        const index = currentL.map(data => data.id).indexOf(e.target.value)
        took.push(currentL[index])
        setTaken(took)
        currentL.splice(index,1)
        console.log(currentL)
        setAvail(currentL)
        document.getElementById(e.target.name).remove()
        
    }
    const dispPLIst=()=>{
        dList.map((player)=>{
            return(
            <tr>
                <td className='tableN'><Button className='pbutt' onClick={handlepick} value={player.id}>{player.name}</Button></td>
                <td className='tableSec'>{player.rank}</td>
                <td className='tableSec'>{player.bye}</td>
                <td className='tableSec'>{player.team}</td>
                {/* <td className='tableSec'>{player.pos}</td> */}
            </tr>
        )})
    }
    const pickPlayer=(e)=>{

    }
    useEffect(()=>{
        console.log('change')
    },[dList])
    const filterList=async(val)=>{
        let list=available
        if(val==='ALL'){

            setDList(available)
        }else{
            console.log(list, val)
        let fList= await list.filter(item=>item.pos===val)
            setDList(fList)
            
        }
        // console.log(list, val)
        // let fList= await list.filter(item=>item.pos===val)
        // console.log(fList)
    }
    const handleSort=async(filter)=>{
        let list=dList
        switch(filter){
            case 'bye':
                let sList= await list.sort(function (a, b) {
                    return a.bye - b.bye;
                  })
                  console.log(sList)
                  setDList(sList)
                  break;
            case 'rank':
                let sRList= await list.sort(function (a, b) {
                    return a.rank - b.rank;
                  })
                  console.log(sRList)
                  setDList(sRList)
                  break;
        }
        
        // var items = [
        //     { name: 'Edward', value: 21 },
        //     { name: 'Sharpe', value: 37 },
        //     { name: 'And', value: 45 },
        //     { name: 'The', value: -12 },
        //     { name: 'Magnetic', value: 13 },
        //     { name: 'Zeros', value: 37 }
        //   ];
          
          // sort by value
        //  const sList= await list.sort(function (a, b) {
        //     return a.bye - b.bye;
        //   })
        //   console.log(sList)
    //     let list=available
    //     console.log(filter)
    //    let newL= await list.sort((a, b) =>{
    //    return a.name > b.name});
    //    console.log(newL)
    //    setDList(newL)
    }
    const handleList=(e)=>{
        e.preventDefault();
        console.log(e.target.value)
        let action=e.target.id
        // let list=dList
        switch(action){
            case 'rank':
                handleSort('rank')
                // console.log(handleSort(list))
                break;
            case 'pos':
                filterList( e.target.value)
                break;
            case 'bye':
                console.log('bye')
                handleSort( 'bye')
                break;    
        }
    }
    return(<>
    <form className='pcard'>
        <Table hoverable={true} centered={true}>
            <thead className='headRow'>
            <tr >
            <th >Name</th>
            <th ><Button onClick={handleList} id='rank'>Rank</Button></th>
            <th ><select onChange={handleList} className="browser-default" id='pos'><option>ALL</option><option>QB</option><option>WR</option><option>RB</option><option>TE</option><option>DEF</option><option>K</option>POS</select></th>
            <th ><Button onClick={handleList} id='bye'>Bye Week</Button></th>
            <th >Team</th>
            </tr>
            </thead>
            {/* <div className='headsSep'></div> */}
            <tbody>
                
            {dList.map((player)=>{
                return(
                <tr id={player.id} key={player.rank}>
                    <td className='tableN'><Button className='pbutt' onClick={handlepick} name={player.id} value={player.name}>{player.name}</Button></td>
                    <td className='tableSec'>{player.rank}</td>
                    <td className='tableSec'>{player.pos}</td>
                    <td className='tableSec'>{player.bye}</td>
                    <td className='tableSec'>{player.team}</td>
                </tr>
                )
            })}  
            </tbody>
            
        </Table>
    </form>
        
    </>)
}
export default PlayerList