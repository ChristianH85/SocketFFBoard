import {atom} from 'jotai'


// export 

export const endpoint=atom(process.env.Port || 'http://127.0.0.1:3001')
export const loggedIn =atom(false)
export const user =atom('')
export const messages=([{msg:'',username:'',time:''}])
export const draft =atom({})
// export const team =atom()
