import { useState } from "react";
import { useAuthContext } from "../Contexts/useAuthContext";

const useAuthhook = (endpoint,email,password) =>{

    const {dispatch} = useAuthContext();
    const [error,setError] = useState('');
    
    const submit = async(e)=>{
        e.preventDefault()
        const user = {email,password}
        const response = await fetch(endpoint,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json()
    
    
        if(response.ok){
        if(data.error){
            setError(data.error)
            
        }else{
            
            setError('')
            localStorage.setItem('user',JSON.stringify(data))
            dispatch({type:'LOGIN',payload:data}); 
            // window.location.reload()
            console.log('new user added',data)
        }
        }
        }
    
    
    return {submit,error}
}

export default useAuthhook;