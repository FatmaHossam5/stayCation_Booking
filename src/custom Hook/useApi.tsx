import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ToastContext } from "../Context/ToastContext"

const useApi =(url)=>{
  const [facilities, setFacilities] = useState([{ "value": '', 'label': '' }])

const[rooms,setRooms]=useState([])

  let reqHeaders = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDUzNjEyMCwiZXhwIjoxNzA1NzQ1NzIwfQ.p15lXfscJSFl8OJ4drIUj0vPPS3nO4L_U6iTbtwBdf8'
  let Headers = { Authorization: reqHeaders }
  const{getToastValue}=useContext(ToastContext)
        {/*Get All Facilities */ }
        const getAllFacilities = () => {
            axios.get(url, { headers: Headers }).then((response) => {
              setFacilities(response?.data?.data?.facilities)
              const newFacilities = response?.data?.data?.facilities
              const facilities = newFacilities.map(({ _id: value, name: label }) => ({ value, label }))
              setFacilities(facilities)
            }).catch((error) => {
              getToastValue('error',error?.response?.data)
            })
          }
          const getAllRooms = () =>{
            axios.get(url,{headers:Headers}).then((response)=>{
              setRooms(response?.data?.data?.rooms)
            }).catch((error)=>{
        
              getToastValue("error",error?.response?.data)
              
            })
          }
useEffect(()=>{
   
    setTimeout(()=>{
        getAllFacilities();
        getAllRooms()
    })
  
},[url]);
return{facilities,rooms,getAllRooms}
}
export default useApi