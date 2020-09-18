import React, {useState} from 'react'
import { Button, TextInput } from 'react-materialize'
import axios from 'axios'
function SignUp(props){
    console.log(props)
    const [username, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const[errM, setErr] = useState('')
    const handleSubmit = event => {
        event.preventDefault();
        if (username === ""){
            setErr("Username must be filled out!")
        } else if (password.length < 6 ){
            setErr("password must be greater than 6 characters")
        }else if(email=== "") {
          console.log("invalid email");
          setErr(
             "Username and password must be filled out!"
          );
          return;
        }else{
            let signupOBj={
                    email:email,
                    password: password,
                    username: username
                }
                props.nUser(signupOBj)
            console.log(signupOBj)
        }
        
        //request to server to add a new username/password
    //     axios.post("/api/signup", {
    //         username: username,
    //         password: password,
    //         email: email
    //       })
    //       .then(response => {
    //         console.log(response);
    //         if (!response.data.error) {
    //           console.log("successful signup");
    //         //   this.setState({
    //         //     //redirect to login page
    //         //     redirectTo: "/"
    //         //   });
    //         } else {
    //           console.log("username already taken");
    //           setErr("Username already taken. Choose another username.")
    //         //   this.setState({
    //         //     signupError: "Username already taken. Choose another username."
    //         //   });
    //         }
    //       })
    //       .catch(error => {
    //         console.log("signup error: ");
    //         console.log(error);
    //       });
      };
    return<>
        <form>
            <TextInput onChange={e => setUser(e.target.value)} name = 'user' placeholder ='username'/>
            <br/>
            <TextInput onChange={e => setEmail(e.target.value)} name = 'email' type='email' placeholder='valid email'/>
            <br/>
            <TextInput onChange={e => setPass(e.target.value)} name = 'pword' type='password' placeholder ='password must be 6 letters'/>
            <br/>
            {errM? <div className='signupE'>{errM}</div>:<div></div>}
            <br/>
            <Button type='button' onClick={handleSubmit} id='primaryBtn'>Sign Up</Button>
        </form>
    </>
}
export default  SignUp