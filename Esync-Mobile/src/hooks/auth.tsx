import React, { useEffect } from "react";
import {
  loginUser,
  logoutUser,
  createUser,
  getUser,
  updatePass,
  updateUserProfile,
} from "./users";

interface UserDataInterface {
  initialized: boolean;
  loggedIn: boolean;
  token: string | null;
}
interface AuthContextInterface {
  authInfo: UserDataInterface | undefined;
  initialize: () => Promise<any>;
  logOut: () => Promise<boolean>;
  logIn: (email: string, password: string) => Promise<boolean>;
  createNewUser: any;
  updateUser: (data: any) => Promise<boolean>;
  user: any;
  resetPass: any;
}

// create the context
export const AuthContext = React.createContext<
  AuthContextInterface | undefined
>(undefined);

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...
type Props = {
  children: React.ReactNode;
};
export const AuthProvider: React.FC = ({ children }) => {
  // the reactive values
  const [authInfo, setAuthInfo] = React.useState<UserDataInterface>();
  const [user, setUser] = React.useState<any | null>(null);
  /**
   * removes undefined properties from object
   * since firebase doesnt like it
   * @param object
   */
  const clearUndefined = (object: any) => {
    Object.keys(object).forEach(
      (key) => (object as any)[key] === undefined && delete (object as any)[key]
    );
    return object;
  };

  const logOut = async () => {
    return new Promise<boolean>(async (resolve) => {
      const id = localStorage.removeItem("USER");
      const token = localStorage.removeItem("TOKEN");

      setUser(null);
      setAuthInfo({ initialized: false, loggedIn: false, token: null });
      let response = await logoutUser();
      console.log("logged out", response);
      await initialize();
      resolve(true);
    });
  };

  /**
   *
   * @param email
   * @param password
   */
  const logIn = (email: string, password: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const id = localStorage.removeItem("USER");
        const token = localStorage.removeItem("TOKEN");

        let userData = await loginUser(email, password);
        setUser(userData.user);
        setAuthInfo({
          initialized: true,
          loggedIn: true,
          token: userData.token,
        });

        localStorage.setItem("USER", userData?.user.id);
        localStorage.setItem("TOKEN", userData.token);

        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  /**
   *
   * @param data
   * @returns
   */
  const createNewUser = (data: any) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        let { user, token } = await createUser(clearUndefined(data));
        let userData = await getUser(user.id || user._id, token);

        setAuthInfo({
          initialized: true,
          loggedIn:true,
          token: userData ? userData.token : null,
        });

        setUser(userData) 
        // window.location.reload() ;
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  const resetPass = (email: string, password: string, token: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        let { user } = await updatePass(email, password, token)      
        let userData = await getUser(user.id || user._id, token);
        console.log(user)
        setAuthInfo({
          initialized: true,
          loggedIn:true,
          token: userData ? userData.token : null,
        });

        setUser(userData) 
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  const updateUser = (data: any) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await updateUserProfile(clearUndefined(data));
        // let userData = await getUser();
        // setUser(userData);

        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  const initialize = () => {
    return new Promise<boolean>(async (resolve) => {
      debugger;
      // let user = await authCheck();
      let userData = null;
      const id = localStorage.getItem("USER");
      const token = localStorage.getItem("TOKEN");

      // const id = "60932b3ea81b043d76212335";
      // const t =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTMyYjNlYTgxYjA0M2Q3NjIxMjMzNSIsImlhdCI6MTYyMDQyMjM2Nn0.lyWSr2_iil0kXGHUGw6n7v0XgxOFTei4RbIaecwrppA";
      // const userData: any = null;

      if (id && id !== "undefined" && token && token !== "undefined") {
        userData = await getUser(id, token);
      }

      setUser(userData);

      setAuthInfo({
        initialized: true,
        loggedIn: userData ? true : false,
        token,
      });

      // setUser(userData);
      // setAuthInfo({
      //   initialized: true,
      //   loggedIn: false,
      //   token: userData ? userData.token : null,
      // });
      resolve(true);
    });
  };

  let state = {
    user,
    authInfo,
    logOut: logOut,
    logIn: logIn,
    createNewUser,
    resetPass,
    updateUser,
    initialize,
  };

  useEffect(() => {
    (async () => {
      await initialize();
    })();
  }, []);

  return (
    <AuthContext.Provider value={state}> {children} </AuthContext.Provider>
  );
};

export const useAuth = () =>
  React.useContext<AuthContextInterface | undefined>(AuthContext)!;
