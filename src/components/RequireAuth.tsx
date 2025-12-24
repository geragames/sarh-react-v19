import {  Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import { Spinner } from "./ui/Spinner";
import { Unauthorized } from "./Unauthorized";


export const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {

  const { roles, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  )

  const location = useLocation()

  if (loading) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  const hasAccess = roles?.some(role => allowedRoles.includes(role))

  if (!hasAccess) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    )
  }

  return <Outlet />
}

/* export const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] } ) => {
   
   // {user, roles, isAuthenticated }
   
    const {user, roles, isAuthenticated, loading }  = useAppSelector((state) => state.auth);

    console.log("USUARIO ", JSON.stringify(user));
  
    const location = useLocation();

    if(loading){
        return <Spinner/>;
    }

    if(isAuthenticated && (!roles || roles.length === 0)){
        return <Spinner/>
    }

    if(!isAuthenticated){ 
        return <Navigate to="/login"  state={{from: location}} replace/>      
    }

    

    const hasAccess = roles.some((role) => allowedRoles.includes(role));

    if(!hasAccess){
        return (<Navigate to="/unauthorized" state={{ from: location }} replace />);
    }

    return (
       <Outlet />
          
    );
      
    

} */ 