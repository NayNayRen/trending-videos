import { createContext, useContext, useState, useEffect } from "react";

// basically gets session and persists through the app and all screens
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
// children are the app screens
const GlobalProvider = ({ children }) => {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setisLoading] = useState(true);
	return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
