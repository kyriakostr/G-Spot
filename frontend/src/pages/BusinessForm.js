import { useEffect, useRef, useState } from "react";
import flattenObj from "../hooks/useRecursion";

const BusinessForm = ({business,handlereservation}) => {
    



const options = business.options;


const [submit,setSubmit] = useState(false)
const [selects,setSelect] = useState([])
const k = useRef({})
let reservation = useRef(null)


const func = (value,arr)=>{
   
        //{category:[sub_1,sub_2],sub_2:[price,price_2]} {br,[],br,[]}
        if(Object.keys(k.current).length===0){

            k.current[value] = arr
        }else{
            
            const p = Object.values(k.current).filter((key)=>key.includes(value)).flat(1)
            console.log(p,value)
            
            const filteredArray = Object.keys(k.current).filter(value => p.includes(value));
            console.log(filteredArray)
            if(filteredArray.length!==0){
                const indexofval = Object.keys(k.current).indexOf(filteredArray[0])
                delete Object.assign(k.current, {[value]: arr })[filteredArray[0]];
                
                
                setSelect((prevselect)=>[...prevselect.slice(0,indexofval+1)])
                console.log('value exists')
            }else{
                k.current[value] = arr
            }
        //    const ind= Object.keys(k.current).findIndex((element)=>element===filteredArray[0])
            
        }
        
      
   
}



const click = (value,obj)=>{
    
    
    const result = flattenObj(obj,value)

    const p = Object.values(result).find((element)=>typeof element==='number')
    
   
    func(value,Object.keys(result))
    console.log(k.current)
    
    

    if(p!==undefined){
        const domoptions =  Object.keys(result).map((option)=>(
            <option value={option+' '+result[option]} key={option}>{option} {result[option]}</option>
        ))
        const domselects = <select name="" id=""  onChange={(e)=>{
            console.log(e.target.value)
            k.current[e.target.value] = e.target.value
            reservation.current = {business_id:business.business_id,business_name:business.business_name,reservation_info:Object.keys(k.current)}
            
            setSubmit(true)
            
        }}>
            {domoptions}
        </select>
        
     
      
    //    setValues((prev)=>({...prev,[value]:Object.keys(result)}))
       setSelect((prevselect)=>([...prevselect,<br/>,domselects]))
        }else{
        const domoptions =  Object.keys(result).map((option)=>(
            <option value={option} key={option}>{option}</option>
        ))
    
        const domselects = <select name="" id=""  onChange={(e)=>{
            
            // setSelect((prevselect)=>([...prevselect.filter((_,i)=>i!==prevselect.length-1)]))
            
            
            click(e.target.value,obj)
        }}>
            {domoptions}
        </select>
        
       
       
    //    setValues((prev)=>({...prev,[value]:Object.keys(result)}))
       setSelect((prevselect)=>([...prevselect,<br/>,domselects]))
       
         
       
    }
    
    
    
}


    return ( 
        <div>
            <h5>
                this is a businessform for {business.business_name}
            </h5>
            
         
           
            <select name="" id="" onChange={(e)=>{
                
                // setValues({[e.target.value]:options[e.target.value]})
                k.current = {}
                setSubmit(false)
                setSelect([])
                click(e.target.value,{[e.target.value]:options[e.target.value]})
                
            }} >
                
                    {
                        Object.keys(business.options).map((key)=>(
                            <option value={key} key={key}>
                                {key}
                            </option>
                        ))
                }
            </select>
           
           {selects}
            <br />
            <br />
           {submit &&
            <button onClick={()=>handlereservation(reservation.current)}>
            Submit
           </button>}
        </div>
     );
}
 
export default BusinessForm;