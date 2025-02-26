// src/main.jsx
import ReactDOMClient from "react-dom/client";

import "./main.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./routes/home/HomePage.tsx";
import RandomPage from "./routes/random/RandomPage.tsx";
import WritePage from "./routes/write/WritePage.tsx";
import AccountsPage from "./routes/account/AccountPage.tsx";
import MyApp from "./MyApp.jsx";
import DiaryPage from "./routes/view-diary/DiaryPage.tsx";

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render:
/*
    This element is to be used SOLELY for routing.
    Please consult the React Router docs for routing information.
    The basic premise is that a route can have "sub routes".
    Sub routes contain further elements that render inside of parent routes.
    As you will see in components such as MyApp, the <Outlet /> component tells the renderer
    where to render sub-route components.

    With the example below, the <MyApp /> component will be rendered when the route is on of:
        "/", "/home", "/random", "/write", "/account"
    Its children routes will render when their portion of the URL is present, and they will render inside
    the <Outlet /> component of the <MyApp /> component.
 */
root.render(
    //  Define the project as a Browser Routed project
    <BrowserRouter>
        {/* All sub-elements are considered routes */}
        <Routes>
            {/* Define a route and any child routes */}
            {/* Primary app route */}
            <Route path={"/"} element={<MyApp/>}>
                {/* Children of that app route */}
                <Route path={"home"} element={<HomePage/>}/>
                <Route path={"diaries/:index"} element={<DiaryPage/>}/>
                <Route path={"entries/write/:entryId"} element={<WritePage/>}/>
                <Route path={"random"} element={<RandomPage/>}/>
                <Route path={"account"} element={<AccountsPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);