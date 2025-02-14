// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route, Link} from "react-router-dom";
// import Table from "./Table";
// import Form from "./Form";
import Home from "./Home.jsx";

function NavigationBar() {
    return (
        <div className="flex flex-col gap-12">
            <Link to="/">Home</Link>
            <Link to="/random">Random Page</Link>
            <Link to="/new-entry">New Entry</Link>
            <Link to="/settings">Settings</Link>
        </div>

    );
}

function Random() {
    return (
        <div style={{display: "flex", gap: "100px"}}>
            RANDOM PAGE
        </div>
    );
}

function NewEntry() {
    return (
        <div style={{display: "flex", gap: "100px"}}>
            Write your Entry!
        </div>
    );
}

function Settings() {
    return (
        <div style={{display: "flex", gap: "100px"}}>
            Change Profile Picture
            Sign out
        </div>
    );
}

function MyApp() {

    return (
        <BrowserRouter>
            <div>
                <NavigationBar/>
            </div>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/random" element={<Random/>}/>
                    <Route path="/new-entry" element={<NewEntry/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
                {/*<Home/>*/}
            </div>
        </BrowserRouter>
    );
}

export default MyApp;

/*
const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        const userToDelete = characters[index];

        deleteUser(userToDelete)
            .then((res) => {
                if (res.status === 204) {
                    // filter out character with the index
                    const updatedCharacters = characters.filter((_, i) => i !== index);
                    setCharacters(updatedCharacters);
                } else {
                    console.log(`User not found with id: ${userToDelete._id}`)
                }
            })
    }

    function deleteUser(person) {
        const promise = fetch(`http://localhost:8000/users/${person._id}`, {
            method: "DELETE",
        });
        return promise;
    }

    //only update the table if our POST call is successful
    function updateList(person) {
        postUser(person)
            .then((res) => {
                if (res.status === 201) {
                    // console.log(`Created successfully ${res.status}`)
                    return res.json();
                } else {
                    console.log(`Error creating character ${res.status}`);
                }
            })
            .then((newUser) => {
                // update with the new user from POST
                setCharacters([...characters, newUser]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {
                console.log(error);
            });
    }, []); //should be called only when the MyApp component first mounts by passing an empty array


 */