import socket from "../socketConfig"
import axios from 'axios'
const DraftApi={
    startDraft:(league)=>{
        // console.log(league,'started')
        socket.emit('startDraft',league)
    },
    // nextPick:(room)=>{
    //     socket.emit('stop-timer')
    //     setTimeout(()=>{
    //         socket.emit('start-timer',room)
    //     },3000)
    // },
    endDraft:(league)=>{
        // console.log(league,'ended')
        socket.emit('endDraft',league)
    },
    makePick:(player,draft_id,user_id,user_email,user_username,avail, currentTurn)=>{
        const pick= {
            player:player,
            draft_id:draft_id,
            user_id:user_id,
            user_email:user_email,
            username:user_username,
            available:avail,
            currentTurn:currentTurn+1
        }
        // console.log(pick,'pick')
        socket.emit('selection',pick)
    },
    adminForcePick:()=>{

    },
    tradePick:()=>{},
    refreshLeague:(id)=>{
        axios.get(`/api/league/${id}`).then(res=>{
            // console.log(res)
            if(res.status===200){
                // console.log(res.status)
                return res.data
            }else{
                console.log(res)
            }

        })
    },
    snake:(tList,rounds)=>{
        let order = [];
        // console.log(tList)
        
        let list1=tList
        // console.log(list1,list2);
        for (let i = 1; i <= rounds; i++) {
          if (i % 2 !== 0) {
            //   console.log(list1)
            list1.forEach((team) => order.push(team));
    
            // console.log(i,list1)
          } else if (i % 2 === 0) {
            let rOrder=list1.reverse()
            // console.log(rOrder)
            rOrder.forEach((team) => order.push(team));
            // return
             rOrder=list1.reverse()
          }
        }
        return order;
    }

}
export default DraftApi