const flattenObj = (ob,value) => {
 
    // The object which contains the
    // final result
    let result = {};
    let arr = []                            
    
    let k = '';
   
       // {category_1:{sub_1:{"price":3, "price":{"superprice":2} },sub_2:{"price":2}},category_2:{sub_1:{"price":2},sub_2:{"price":3}}}
       for(const i in ob){
        k = Object.keys(ob).find((element)=>element===value)
        
        if(k===undefined){
            if(typeof ob[i]==='number') continue
            // console.log('no value')
            const temp = flattenObj(ob[i],value)
            if(temp){
                return temp
            }else{
                continue
            }
            
            
        
        }
        else{
            
            // console.log(k)
            return ob[k]
        
        }
        
       } 
       
        
      
    
    
};
export default flattenObj;