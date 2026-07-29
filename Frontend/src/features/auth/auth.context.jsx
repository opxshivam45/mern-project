import { createContext, useState } from "react";
import {getMe} from "./services/auth.api";
export const AuthContext = createContext();
// preferable-01
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() =>{
  //   const getAndSetUser = async() =>{
  //     const data = await getMe()
  //     setUser(data.user)
  //     setLoading(false)
  //   }

  //   getAndSetUser()
  // },[])
//-02
//   useEffect(() => {
//   const getAndSetUser = async () => {
//     try {
//       const data = await getMe();
//       setUser(data.user);
//     } catch (err) {
//       console.log(err);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   getAndSetUser();
// }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};