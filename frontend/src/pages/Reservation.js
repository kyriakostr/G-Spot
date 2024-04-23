import { useAuthContext } from "../Contexts/useAuthContext"


const ReservationPage = ({reservationinfo,returntosearch}) => {
    
    const {user} = useAuthContext()
    const purchase = async() =>{
        const response = await fetch('/user/purchase',{
            method:'POST',
            body:JSON.stringify({reservationinfo,user}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    
    }
    return ( 
        <div>
            <h2>
                These are your Reservation Info
            </h2>
            <div>
                {
                    Object.keys(reservationinfo).slice(1,Object.keys(reservationinfo).length-1).map((key)=>(
                        <div>
                           { reservationinfo[key]}
                            <br />
                        </div>
                    )
                        )
                      
                }
                
                {
                    reservationinfo.reservation_info.map((item)=>(
                        <p>{item}</p>
                    ))
                }
            </div>
            <button onClick={purchase}>
                Purchase
            </button>
            <button onClick={()=>returntosearch()}>
                Return to search
            </button>
        </div>
     );
}
 
export default ReservationPage;