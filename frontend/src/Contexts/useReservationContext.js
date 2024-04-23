import { useContext } from "react";
import { Reservationcontext } from "./reservationContext";


export const useReservationContext = () =>{
    const context = useContext(Reservationcontext);

    if(!context){
        throw Error('Error using provider')
    }

    return context;
}