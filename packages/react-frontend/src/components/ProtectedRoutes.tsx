import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {getUser} from "../api/backend";
import {useEffect, useState} from "react";

export default function ProtectedRoutes() {
    let navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // On component mount check auth
    useEffect(() => {
        const getAuth = async () => {
            try {
                // Get truthy value of user type
                // NOTE: This could be edited to instead set the user of the app.
                const user = await getUser();
                console.log(user);
                setIsAuthenticated(!!user);

            }
            catch (e) {
                console.log(e);
                // Catch errors and force navigation
                setIsAuthenticated(false);
            }
        }
        getAuth();
    }, [])

    // On auth update determine if navigate is necessary
    useEffect(() => {
        if (!isAuthenticated)
            navigate("/login");
    }, [isAuthenticated]);

    return ( isAuthenticated
            ? <Outlet />
            : <div className="w-screen h-screen flex justify-center items-center">
                <h1>Who invited this guy? 🫵😭</h1>
            </div>
    )
}