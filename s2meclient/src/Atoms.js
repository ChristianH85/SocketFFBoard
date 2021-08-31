import {atom} from 'jotai'

export const loggedIn =atom(false)
export const chosenLeague=atom('')
export const user =atom('')
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
    draftOrder:[],
    leagues:[],
    users:[]
})

// export const team =atom()
