import React, { useState } from 'react'
import { Card, TextInput, Button } from 'react-materialize'
function Login (props) {
    
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const[errM, setErr] = useState('')
    const handleSubmit = event => {
        event.preventDefault();
        
        if (password.length < 6 ){
            setErr("password must be greater than 6 characters")
        }else if(email=== "") {
          console.log("invalid email");
          setErr(
             "Username and password must be filled out!"
          );
          return;
        }else{
            let loginOBj={
                    email:email,
                    password: password,
                }
                props.lUser(loginOBj)
            console.log(loginOBj)
        }
    }
    return <>
        <form>
            <TextInput onChangename = 'email' type='email' placeholder='email'/>
            <br/>
            <TextInput onChange={e => setPass(e.target.value)} name = 'pword' type='password' placeholder ='password'/>
            <br/>
            <Button type='submit' onClick={handleSubmit}id='primaryBtn'>Login</Button>
        </form>
    </>
}
export default  Login