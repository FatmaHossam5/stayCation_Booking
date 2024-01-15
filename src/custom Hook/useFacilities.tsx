import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


const useFacilities = () => {
  const [facilities, setFacilities] = useState([{ "value": '', 'label': '' }])
  let reqHeaders = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDUzNjEyMCwiZXhwIjoxNzA1NzQ1NzIwfQ.p15lXfscJSFl8OJ4drIUj0vPPS3nO4L_U6iTbtwBdf8'
  let Headers = { Authorization: reqHeaders }

  {/*Get All Facilities */ }
  const getAllFacilities = () => {
    axios.get('http://154.41.228.234:3000/api/v0/admin/room-facilities', { headers: Headers }).then((response) => {
      setFacilities(response?.data?.data?.facilities)
      const newFacilities = response?.data?.data?.facilities
      const facilities = newFacilities.map(({ _id: value, name: label }) => ({ value, label }))
      setFacilities(facilities)
    }).catch((error) => {
      toast.error(error?.response?.data)
    })
  }

  useEffect(() => {
    getAllFacilities();
  }, []);
  return { facilities }
}
export default useFacilities