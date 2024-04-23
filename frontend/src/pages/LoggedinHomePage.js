import { useState } from "react";
import { useAuthContext } from "../Contexts/useAuthContext";
import useLogout from "../hooks/logout";
import BusinessForm from "./BusinessForm";
import ReservationPage from "./Reservation";



const LoggedinHomePage = () => {

    const {user} = useAuthContext();
    const {logout} = useLogout();
    const [suggestions,setSuggestion] = useState([]);
    const [inputvalue,setInput] = useState('')
    const [userchoice,setChoice] = useState('')
    const [isloading,setLoading] = useState(false)
    const [form,setForm] = useState(null)
    const [reservationinfo,setReservation] = useState(null)


    const handlereservation = (reservation)=>{
        setForm(null)
        setReservation(reservation)
    }
    const returntosearch = () =>{
        setReservation(null)
        setChoice('')
        setInput('')
    }

    const onclicksuggestions = async(input) =>{ //function triggered when user types
        const response = await fetch(`/user/${user.token}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'}, //gets input and sends to server
            body:JSON.stringify({input})
        });
        const data = await response.json(); //get data

       if(response.ok){
        
        console.log(data.businesses)
       
        setTimeout(()=>{
            setSuggestion(data.businesses) //set suggestions as data from server
        },180)
        setTimeout(()=>{
            setLoading(false)
        },80)
       }
       
        
    }


    
    return ( 
    <div>
        <h1>
            You are Logged in
        </h1>
        <button onClick={logout}>
            Logout
        </button>
        <br />
        {!reservationinfo && <input type="text" 
        value={userchoice.length>0 ? userchoice : inputvalue} //if clicked the textinput takes the value the user clicked
                                                              //else takes the user input
        onChange={(e)=>{
          
                 //if there are no suggestions set loading to true and choice to ''
            if(!suggestions.length>0){
                setLoading(true)
                setChoice('')
            }
            setInput(e.target.value)
            onclicksuggestions(e.target.value)
            
        }}
        />}

        {isloading && <p>Loading...</p> }
        
        { !isloading &&
            suggestions.map((suggestion)=>(
                <div key={suggestion.business_id}>
                    <p onClick={()=>{
                        console.log('clicked',suggestion)
                        setChoice(suggestion.business_name) //sets to textinput the value we clicked
                        setSuggestion([]) //empty suggestions
                        if(form && form.business_name!==suggestion.business_name){
                            setForm(null)
                            setTimeout(()=>{
                                setForm(suggestion)
                            },100)
                            
                        }else{
                            setForm(suggestion)
                        }
                        
                        
                    }}>{suggestion.business_name}</p>
                </div>
            ))
        }
        
        {form && <BusinessForm business={form} handlereservation={handlereservation}/>}
        {reservationinfo && <ReservationPage reservationinfo={reservationinfo} returntosearch={returntosearch}/>}
    </div> );
}
 
export default LoggedinHomePage;