import {   useState } from "react";
// import { useAuthContext } from "../Contexts/useAuthContext";
import useAuthhook from '../hooks/useAuth';

const LoginPage = () => {
    
    
    const [email,Setemail] = useState('')
    const [password,Setpass] = useState('');
  
    const {submit,error}=useAuthhook('/Login',email,password)

 
    return ( 
    <div>
        <h1>
            Login
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
    </div> );
}
 
export default LoginPage;