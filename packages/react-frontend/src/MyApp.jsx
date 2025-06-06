// src/MyApp.jsx
import { Outlet, Link } from "react-router-dom";
import { ChatIcon, HomeIcon, PenIcon, UserCircleIcon } from "./assets/icons";
import { Toaster } from "react-hot-toast";

function NavigationBar() {
  const pages = [
    { link: "/app/home", name: "Home", icon: <HomeIcon className="icon-sm" /> },
    {
      link: "/app/random",
      name: "Random",
      icon: <ChatIcon className="icon-sm" />,
    },
    {
      link: "/app/write",
      name: "Write",
      icon: <PenIcon className="icon-sm" />,
    },
    {
      link: "/app/account",
      name: "Account",
      icon: <UserCircleIcon className="icon-sm" />,
    },
  ];

  return (
    <div className="bottom-0 left-0 right-0 md:top-0 md:left-0 md:bottom-0 md:right-auto md:h-full md:w-fit flex flex-row md:flex-col gap-12 p-3 bg-secondary-500 justify-center items-center">
      {pages.map((page, index) => (
        <div
          key={index}
          className="hover:text-primary-500 transition-all duration-150 font-semibold"
        >
          <Link
            to={page.link}
            className="flex flex-col items-center justify-center"
          >
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
    <div className="flex flex-col w-screen h-screen">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="hidden md:flex flex-row justify-center items-center bg-primary-800 p-4">
        <h1>Diary Share</h1>
      </div>

      {/* Content on Desktop */}
      <div className="flex flex-col md:flex-row h-full w-full overflow-y-hidden">
        <div className="h-full w-full overflow-y-auto">
          <Outlet />
        </div>

        <NavigationBar />
      </div>
    </div>
  );
}
