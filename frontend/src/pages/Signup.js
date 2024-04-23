import useAuthhook from '../hooks/useAuth';
import {useState } from "react";
const Signup = () => {

    const [email,Setemail] = useState('')
    const [password,Setpass] = useState('');

    const {submit,error}=useAuthhook('/Signup',email,password)

    

    return ( 
    <div>
        <h1>
            Sign up
        </h1>
        <form  onSubmit={submit}>
        <input type="text" 
        onChange={(e)=>Setemail(e.target.value)}
        value={email}
        />
        <br />
        <input type="text" 
        onChange={(e)=>Setpass(e.target.value)}
        value={password}/>
        <br />
        <button>
            Submit
        </button>
        <p>{error}</p>
        </form>
    </div> 
    );
}
 
export default Signup;