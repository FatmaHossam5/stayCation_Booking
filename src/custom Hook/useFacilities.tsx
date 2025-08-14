import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../Context/AuthContext"


const useFacilities = () => {
  const [facilities, setFacilities] = useState([])
  const [formattedFacilities, setFormattedFacilities] = useState<Array<{ value: string; label: string }>>([]);
   const {baseUrl,reqHeaders}=useContext(AuthContext)



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
      toast.error(error?.response?.data || 'Failed to fetch facilities');
      setFormattedFacilities([]);
    })
  }

  useEffect(() => {
    getAllFacilities();
  }, []);
  return { facilities,formattedFacilities,getAllFacilities  }
}
export default useFacilities