import {Navigate, Outlet} from "react-router-dom";
import {getUser} from "@src/api/backend";

export default async function ProtectedRoutes() {

    let isAuthenticated: boolean;
    try {
        // Get truthy value of user type
        // NOTE: This could be edited to instead set the user of the app.
        isAuthenticated = !!(await getUser());
    }
    catch (e) {
        console.log(e);
        // Catch errors and force navigation
        isAuthenticated = false;
    }

    return ( isAuthenticated
            ? <Outlet />
            : <Navigate to={'/login'}/>
    )
}