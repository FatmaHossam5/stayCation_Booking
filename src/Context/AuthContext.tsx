import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  userData: any;
  saveUserData: () => void;
  baseUrl: string;
  reqHeaders: { Authorization: string };
  role: string;
  userName: string;
  userToken: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  userData: null,
  saveUserData: () => {},
  baseUrl: '',
  reqHeaders: { Authorization: '' },
  role: '',
  userName: '',
  userToken: null
});


export default function AuthContextProvider(props:any){

  const [userData, setUserData] = useState<any>(null);
  const[role,setRole]=useState('')
  const[userName,setUserName]=useState('')
  const[userToken,setUserToken]=useState<string | null>(localStorage.getItem("userToken"))
  
  // Make reqHeaders reactive to token changes
  const reqHeaders = {
    Authorization: `Bearer ${userToken}`
  };
  const baseUrl = "https://upskilling-egypt.com:3000/api/v0";

  const saveUserData = () => {
    try {
      const encodedToken:any = localStorage.getItem("userToken");
      if (encodedToken) {
        const decodedToken = jwtDecode(encodedToken)
        const userName = localStorage.getItem('userName')
        const role = localStorage.getItem("role")
        setUserData(decodedToken)
        setUserName(userName || '')
        setRole(role || '')
        setUserToken(encodedToken)
      } else {
        // Clear state when no token exists
        setUserData(null);
        setUserName('');
        setRole('');
        setUserToken(null);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      // Clear invalid data
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      setUserData(null);
      setUserName('');
      setRole('');
      setUserToken(null);
    }
  };


  // const onlinePayment(roomId,url,values){
  //   axios.post(`${roomId}`)
  // }


  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
      
    }
  }, []);


  return (
    <AuthContext.Provider value={{userData,saveUserData,baseUrl,reqHeaders,role,userName,userToken}}>
      {props.children}
    </AuthContext.Provider>
  );
}
