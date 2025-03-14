// src/MyApp.jsx
import {Outlet, Link} from "react-router-dom";

import {ChatIcon, HomeIcon, PenIcon, UserCircleIcon} from "./assets/icons";

function NavigationBar() {
    const pages = [
        {link: "/home", name: "Home", icon: <HomeIcon className="icon-sm"/>},
        {link: "/random", name: "Random", icon: <ChatIcon className="icon-sm"/>},
        {link: "/entries/write/", name: "Write", icon: <PenIcon className="icon-sm"/>},
        {link: "/account", name: "Account", icon: <UserCircleIcon className="icon-sm"/>},
    ]

    return (
        <div
            className="fixed bottom-0 md:static flex flex-row md:flex-col gap-12 p-3 bg-secondary-500 md:w-fit md:h-full w-full h-fit justify-center items-center">

            {pages.map((page, index) => (

                <div key={index} className="hover:text-primary-500 transition-all duration-150 font-semibold">
                    <Link to={page.link} className="flex flex-col items-center justify-center">
                        {page.icon}
                        <p>{page.name}</p>
                    </Link>
                </div>
            ))}
        </div>

    );
}

export default function MyApp() {
    return (
        <div className="grid grid-rows-[auto_1fr] h-screen w-screen">
            {/* Header */}
            <div className="hidden h-fit md:flex flex-row justify-center items-center bg-primary-800 p-4">
                <h1>Diary</h1>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row flex-1 overflow-y-auto overflow-x-hidden">
                {/* Desktop scrollbar */}
                <NavigationBar/>

                <div className="overflow-y-auto flex-1 pb-24">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}