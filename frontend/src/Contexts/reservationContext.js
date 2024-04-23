import { createContext, useEffect, useReducer } from "react"


export const Reservationcontext = createContext();

export const Reservationreducer = (state,action)=>{
    switch(action.type)
    {
        case 'PURCHASE':
            return {
                reservation:action.payload
            }
        
        default:
            return state

    }

}


export const ReservationProvider = ({children}) =>{

    const [state,dispatch] = useReducer(Reservationreducer,
        {
        reservation:null
        }
    )
    
//   useEffect(()=>{
//     const user = JSON.parse(localStorage.getItem('user'));
//     if(user){
//         dispatch({type:'LOGIN',payload:user})
//     }
//   },[])
    return(
        <ReservationProvider.Provider value={{...state , dispatch}}>
        {children}
        </ReservationProvider.Provider>
    )

}