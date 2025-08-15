import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useToastMessages, handleApiError } from "../utils/toastUtils"


const useFacilities = () => {
  const [facilities, setFacilities] = useState([])
  const [formattedFacilities, setFormattedFacilities] = useState<Array<{ value: string; label: string }>>([]);
   const {baseUrl,reqHeaders}=useContext(AuthContext)
   const toastMessages = useToastMessages();



  {/*Get All Facilities */ }
  const getAllFacilities = () => {
    axios.get(`${baseUrl}/admin/room-facilities`, { headers: {
      'Authorization': `${localStorage.getItem('userToken')}`
    }, }).then((response: any) => {
      const allFacilitiesData = response?.data?.data?.facilities || [];
      setFacilities(allFacilitiesData)
      const formattedFacilitiesForSelect = allFacilitiesData.map(({ _id, name }: { _id: string; name: string }) => ({ value: _id, label: name }));
      setFormattedFacilities(formattedFacilitiesForSelect);
      
    }).catch((error) => {
      console.error('Error fetching facilities:', error);
      handleApiError(error, toastMessages);
      setFormattedFacilities([]);
    })
  }

  useEffect(() => {
    getAllFacilities();
  }, []);
  return { facilities,formattedFacilities,getAllFacilities  }
}
export default useFacilities