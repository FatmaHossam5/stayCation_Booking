import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../Context/AuthContext"


const useFacilities = () => {
  const [facilities, setFacilities] = useState([])
  const [formattedFacilities, setFormattedFacilities] = useState([{ "value": '', 'label': '' }]);
   const {baseUrl,reqHeaders}=useContext(AuthContext)



  {/*Get All Facilities */ }
  const getAllFacilities = () => {
    axios.get(`${baseUrl}/admin/room-facilities`, { headers: reqHeaders }).then((response) => {
      const allFacilitiesData = response?.data?.data?.facilities;
      setFacilities(allFacilitiesData)
      const formattedFacilitiesForSelect = allFacilitiesData.map(({ _id: value, name: label }) => ({ value, label }));
      setFormattedFacilities(formattedFacilitiesForSelect);
      
    }).catch((error) => {
      toast.error(error?.response?.data)
    })
  }

  useEffect(() => {
    getAllFacilities();
  }, []);
  return { facilities,formattedFacilities,getAllFacilities  }
}
export default useFacilities