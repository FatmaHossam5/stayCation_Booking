import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


const useRooms = () => {
    const[rooms,setRooms]=useState([])
  let reqHeaders = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDUzNjEyMCwiZXhwIjoxNzA1NzQ1NzIwfQ.p15lXfscJSFl8OJ4drIUj0vPPS3nO4L_U6iTbtwBdf8'
  let Headers = { Authorization: reqHeaders }

  {/*Get All Rooms */ }

  const getAllRooms = () =>{
    axios.get('http://154.41.228.234:3000/api/v0/admin/rooms?page=1&size=40',{headers:Headers}).then((response)=>{
      setRooms(response?.data?.data?.rooms)
    }).catch((error)=>{

      toast.error(error?.response?.data)
      
    })
  }
  useEffect(() => {
    getAllRooms();
  }, []);
  return { rooms ,getAllRooms}
}
export default useRooms