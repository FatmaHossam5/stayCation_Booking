// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import FacebookLogin from 'react-facebook-login';
// import { AuthContext } from '../../Context/AuthContext';

// const FacebookLoginButton = () => {
//   const [accessToken, setAccessToken] = useState(null);
//   const {baseUrl,reqHeaders}=useContext(AuthContext)

//   const handleFacebookLogin = (response) => {
//     setAccessToken(response.accessToken);

//     axios({
//       method: 'post',
//       url: `${baseUrl}/portal/users/auth/facebook`,
//       headers: {
//         Headers: reqHeaders,
//       },
//       data: { accessToken },
//     })
//       .then((response) => {
//         console.log('API response:', response.data);
//       })
//       .catch((error) => {
//         console.error('API error:', error);
//       });
//   };

//   return (
//     <FacebookLogin
//       appId="1503450150434613" 
//       autoLoad={false}
//       fields="name,email"
//       callback={handleFacebookLogin}
//       buttonText="Login with Facebook"
//       cssClass="facebook-login-button"
//       icon="fa-facebook-square"
//     />
//   );
// };

// export default FacebookLoginButton;