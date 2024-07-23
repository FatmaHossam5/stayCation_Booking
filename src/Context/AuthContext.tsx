import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export  const AuthContext = createContext ({});


export default function AuthContextProvider(props:any){

  const [userData, setUserData] = useState('');
  const[role,setRole]=useState('')
  const[userName,setUserName]=useState('')
  

  let reqHeaders={
    Authorization:` ${localStorage.getItem("userToken")}`
  }
  const baseUrl = "https://upskilling-egypt.com:3000/api/v0";

  const saveUserData = () => {
    const encodedToken:any = localStorage.getItem("userToken");
    const decodedToken=jwtDecode(encodedToken)
    const userName=localStorage.getItem('userName')
    const role=localStorage.getItem("role")
setUserData(decodedToken)
setUserName(userName)
setRole(role)







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
    <AuthContext.Provider value={{userData,saveUserData,baseUrl,reqHeaders,role,userName}}>
      {props.children}
    </AuthContext.Provider>
  );
}
