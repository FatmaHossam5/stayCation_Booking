import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../Context/AuthContext"

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  images?: string[];
}

const useRooms = () => {
    const[rooms,setRooms]=useState<Room[]>([])
    const [fetchCount, setFetchCount] = useState(0);
    const{baseUrl,reqHeaders}=useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
     const getAllRooms=()=>{
      setLoading(true);
      
      // Try with 'size' parameter first (most common)
      const url = `${baseUrl}/admin/rooms?page=${currentPage}&size=${rowsPerPage}`;
      
      axios.get(url,{
        headers: {
          'Authorization': `${localStorage.getItem("userToken")}`,
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
        // Handle different possible response structures
        const rooms = response?.data?.data?.rooms || response?.data?.rooms || [];
        const totalCount = response?.data?.data?.totalCount || response?.data?.totalCount || 0;
        
        setRooms(rooms);
        setTotalPages(totalCount);
      }).catch((error)=>{
        // Check for specific error types
        if (error?.response?.status === 401) {
          toast.error('Authentication failed. Please login again.');
        } else if (error?.response?.status === 404) {
          toast.error('API endpoint not found. Please check the URL.');
        } else if (error?.code === 'ERR_NETWORK') {
          toast.error('Network error. Please check your internet connection.');
        } else {
          toast.error(error?.response?.data?.message || 'Error fetching rooms');
        }
      }).finally(() => {
        setLoading(false);
      })
    }
    getAllRooms();
  }, [fetchCount, currentPage, rowsPerPage, baseUrl]);
  
  const refetchRooms  = () => {
    setFetchCount((prev) => prev+1);
  };
  
  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };
  
  return { rooms, refetchRooms, currentPage,
    totalPages,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    loading }
}
export default useRooms