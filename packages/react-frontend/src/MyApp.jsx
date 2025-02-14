// src/MyApp.jsx
import { Outlet, Link } from "react-router-dom";

import {HomeIcon} from "./assets/icons";

function NavigationBar() {
    const pages = [
        { link: "/home", name: "Home" },
        { link: "/random", name: "Random" },
        { link: "/write", name: "Write" },
        { link: "/account", name: "Account" },
    ]

    return (
        <div className="flex flex-col gap-12 p-2 bg-secondary-500 w-fit h-full justify-center items-center">

            {pages.map((page, index) => (

                <Link key={index} to={page.link} className="flex flex-col items-center justify-center hover:text-primary-800">
                    <HomeIcon className="icon"/>
                    <p>{page.name}</p>
                </Link>
            ))}

        </div>

    );
}

export default function MyApp() {
    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Header */}
            <div className="flex flex-row justify-center items-center bg-primary-800 p-4">
                <h1>Diary</h1>
            </div>

            {/* Content */}
                <div className="flex flex-row h-full w-full">

                    <NavigationBar/>

                    <Outlet />
                </div>
        </div>
    );
}