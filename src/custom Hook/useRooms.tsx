import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../Context/AuthContext"


const useRooms = () => {
    const[rooms,setRooms]=useState([])
    const [fetchCount, setFetchCount] = useState(0);
    const{baseUrl,reqHeaders}=useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);



  useEffect(() => {
     const getAllRooms=()=>{
      axios.get(`${baseUrl}/admin/rooms?page=${currentPage}&size=${rowsPerPage}`,{headers:reqHeaders}).then((response)=>{
        setRooms(response?.data?.data?.rooms)
        setTotalPages(response?.data?.data?.totalCount)
      }).catch((error)=>{
  
        toast.error(error?.response?.data)
        
      })
    }
    getAllRooms();
  }, [fetchCount,currentPage, rowsPerPage]);
  const refetchRooms  = () => {
    setFetchCount((prev) => prev+1);
    
    
  };
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setCurrentPage(1);
  };
  return { rooms ,refetchRooms,currentPage,
    totalPages,
    rowsPerPage,
    handlePageChange,
  handleRowsPerPageChange }
}
export default useRooms