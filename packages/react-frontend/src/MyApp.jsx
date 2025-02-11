// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";
import Home from "./Home.jsx";

function MyApp() {
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


    return (
        <div className="container">
            <Home/>
        </div>
    );
}

export default MyApp;

