import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});


export default function AuthContextProvider(props: any) {

  const [userData, setUserData] = useState('');
  const [role, setRole] = useState('')


  let reqHeaders = {
    Authorization: `${localStorage.getItem("userToken")}`
  }
  const baseUrl = "http://upskilling-egypt.com:3000/api/v0";

  const saveUserData = () => {
    const encodedToken: any = localStorage.getItem("userToken");
    setUserData(encodedToken)


  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();

    }
  }, []);

  const userRole = localStorage.getItem("role")


  return (
    <AuthContext.Provider value={{ userData, saveUserData, baseUrl, reqHeaders, role, userRole }}>
      {props.children}
    </AuthContext.Provider>
  );
}
