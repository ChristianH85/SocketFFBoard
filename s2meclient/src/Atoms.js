import {atom} from 'jotai'


// export 

export const port=atom('')
export const loggedIn =atom(false)
export const chosenLeague=atom('')
export const user =atom('')
// export const clock=atom(0)
export const messages=([{msg:'',username:'',time:''}])
export const draft =atom({
    id:'',
    commish:'',
    draftTime:'',
    messages:[],
    round:1,
    leagueName:'',
    trounds:0,
    teams:[],
    currentPick:"",
    availableP:[],
    picked:[],
    leagues:[],
    users:[]
})

// export const team =atom()
