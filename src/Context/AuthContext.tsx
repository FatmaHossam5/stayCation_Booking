import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export  const AuthContext = createContext ({});


export default function AuthContextProvider(props:any){

  const [userData, setUserData] = useState('');
  const[role,setRole]=useState('')
  

  let reqHeaders={
    Authorization:`${localStorage.getItem("userToken")}`
  }
  const baseUrl = "http://upskilling-egypt.com:3000/api/v0";

  const saveUserData = () => {
    const encodedToken:any = localStorage.getItem("userToken");
setUserData(encodedToken)


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
    <AuthContext.Provider value={{userData,saveUserData,baseUrl,reqHeaders,role}}>
      {props.children}
    </AuthContext.Provider>
  );
}
