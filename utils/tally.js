let countV=(user,picks)=>{
    let plist= picks.map((pick,i)=>{
        if(pick.id===user._id){
        return(pick.pick)
        }
    })
    let nList = plist.filter(item=>{return item!==undefined})
    return nList
}
const tally= (users,picks)=>{
    let results =  users.map((user,i)=>{
        let mypicks = countV(user,picks)
        let pObj={
            id:user._id,
            email:user.email,
            picks:mypicks
        }
        return pObj
    })    
    return results
}
module.exports={tally}