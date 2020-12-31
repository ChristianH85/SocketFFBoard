import {atom} from 'jotai'


// export 

export const port=atom('')
export const loggedIn =atom(false)
export const user =atom('')
export const messages=([{msg:'',username:'',time:''}])
export const draft =atom({})
// export const team =atom()
