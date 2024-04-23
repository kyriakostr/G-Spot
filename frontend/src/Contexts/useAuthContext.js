import { useContext } from "react";
import { Authcontext } from "./authcontext";

export const useAuthContext = () =>{
    const context = useContext(Authcontext);

    if(!context){
        throw Error('Error using provider')
    }

    return context;
}