import React, { useEffect } from 'react'
import { FacebookProvider, LoginButton } from 'react-facebook-sdk';



export default function LoginFace() {

    const facebookAuthEndpoint = "{{baseUrlLocal}}/api/v0/portal/users/auth/facebook";

  const handleResponse = (data) => {
    console.log('Facebook login response:', data);
  };


  useEffect(() => {
   
  }, []);

  return (
    <>
       <FacebookProvider appId="your-app-id">
      <LoginButton
        scope="email"
        onResponse={handleResponse}
        onError={(error) => console.error('Facebook login error:', error)}
        render={({ onClick, isProcessing }) => (
          <button onClick={onClick} disabled={isProcessing}>
            Login with Facebook
          </button>
        )}
      />
    </FacebookProvider>
    </>
  )
}



