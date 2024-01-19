// import { createContext, useContext, useState } from 'react';

// const AdsContext = createContext({});

// export const AdsProvider = ({ children }) => {
//   const [isActive, setIsActive] = useState(false);
//   const handleActiveChange = (event) => {

//     setIsActive(event.target.value);
//   };
//   return (
//     <AdsContext.Provider value={{ isActive, setIsActive ,handleActiveChange}}>
//       {children}
//     </AdsContext.Provider>
//   );
// };

// export const useAdsContext = () => {
//   return useContext(AdsContext);
// };