
import { useAuthContext } from "../Contexts/useAuthContext"

const useLogout = () =>{
    const {dispatch}=useAuthContext();
    const logout = ()=>{
        localStorage.removeItem('user')
        // window.location.reload();
        dispatch({type:'LOGOUT',payload:null})
    }

    return {logout}
}

export default useLogout;