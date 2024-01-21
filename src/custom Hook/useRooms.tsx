import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../Context/AuthContext"


const useRooms = () => {
    const[rooms,setRooms]=useState([])
    const [fetchCount, setFetchCount] = useState(0);
    const{baseUrl,reqHeaders}=useContext(AuthContext)
  


  useEffect(() => {
     const getAllRooms=()=>{
      axios.get(`${baseUrl}/admin/rooms?page=1&size=40`,{headers:reqHeaders}).then((response)=>{
        setRooms(response?.data?.data?.rooms)
      }).catch((error)=>{
  
        toast.error(error?.response?.data)
        
      })
    }
    getAllRooms();
  }, [fetchCount]);
  const refetchRooms  = () => {
    setFetchCount((prev) => prev+1);
    
    
  };
  return { rooms ,refetchRooms }
}
export default useRooms