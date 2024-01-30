import { useContext, useEffect, useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Doughnut} from "react-chartjs-2";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function Ch() {

 

  const [rooms, setRooms] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [ads, setAds] = useState(0);
 

  const {baseUrl}:any=useContext(AuthContext)
  let reqHeaders ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk2ZjliYjYzODg0OGJjZTZlZmIwMjIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNjU4MzUxOCwiZXhwIjoxNzA3NzkzMTE4fQ.04fHysACRF8zLVXVOh6koczinSM2diu6CUbWHVyXTaw"
  let Headers = { Authorization: reqHeaders }


  const getTasksCounts =()=>{
    axios.get(`${baseUrl}/admin/dashboard`,{headers:Headers}).then((response)=>{
      console.log(response?.data);
      
      setRooms(response?.data?.rooms)
      setFacilities(response?.data?.facilities)
      setAds(response?.data?.ads)

    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getTasksCounts();
  },[])
  
  const data = {
    labels: ["rooms", "facilities","ads"],
    datasets: [
      {
        label: "Employee Status",
        data: [rooms,facilities,ads ],
        borderWidth: 1,
        backgroundColor:['pink','gray',"beige"],
      },
    ],
    options: {
      scales: {
        x: { 
          display: false,
          drawOnChartArea: true
        },
      },
    },
  };

  useEffect(() => {
    ChartJs.register();
  }, []);

  return (
    <div style={{width:'50%'}}>
      <Doughnut data={data} ></Doughnut>
    </div>
  );
}
