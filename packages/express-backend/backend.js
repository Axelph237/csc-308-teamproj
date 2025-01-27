// backend.js
import express from "express"; // import express
import cors from "cors";
import userServices from "./user-services.js";


// const users = {
//     users_list: [
//         {
//             id: "xyz789",
//             name: "Charlie",
//             job: "Janitor"
//         },
//         {
//             id: "abc123",
//             name: "Mac",
//             job: "Bouncer"
//         },
//         {
//             id: "ppp222",
//             name: "Mac",
//             job: "Professor"
//         },
//         {
//             id: "yat999",
//             name: "Dee",
//             job: "Aspring actress"
//         },
//         {
//             id: "zap555",
//             name: "Dennis",
//             job: "Bartender"
//         }
//     ]
// };

const app = express(); // create an instance of express
const port = 8000; // constant of port 

app.use(cors());
app.use(express.json()); // process incoming data in JSON format

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};
const findUserByNameAndJob = (name, job) => {
    // return users["users_list"].filter(
    //     (user) => user["name"] === name && user["job"] === job
    // );
    const userByName = userServices.findUserByName(name);
    const userByJob = userServices.findUserByJob(job);

    const filteredUsers = usersByName.filter(user =>
        usersByJob.some(jobUser => jobUser._id.equals(user._id))
    );

    return filteredUsers;
};
const findUsersById = (id) =>
    users["users_list"].find((user) => user["id"] === id); //returns the first occurrence that matches the condition

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}

const deleteUser = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id);
    if (index !== -1) {
        users["users_list"].splice(index, 1);
        return true;
    }
    return false;
}
// generates ID using name and random number 0-99
function generateID(user) {
    return `${user.name}${Math.floor(Math.random() * 100)}`;
}
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    if (userToAdd.name && userToAdd.job) {
        if (!userToAdd.id) {
            userToAdd.id = generateID(userToAdd);
        }

        // Reordered so the id is at the top of the attributes (not necessary but just for organization)
        const reorderedUser = {
            id: userToAdd.id,
            name: userToAdd.name,
            job: userToAdd.job
        };
        userServices.addUser(reorderedUser)
            .then((addedUser) => {
                res.status(201).send(addedUser);
            })
            .catch((error) => {
                res.status(500).send("Error adding user");
            });
    }
    else {
        res.status(400).send("Invalid user data");
    }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const success = deleteUser(id);
    if (success) {
        res.status(204).send();
    }
    else {
        res.status(404).send("User not found.");
    }

})

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; // req.params.id

    userServices.findUserById(id)
        .then((user) => {
            if (!user) {
                res.status(404).send("Resource not found");
            } else {
                res.send(user);
            }
        })
        .catch((error) => {
            res.status(500).send("Error finding user");
        })
    // let result = findUsersById(id);
    // if (result === undefined) {
    //     res.status(404).send("Resource not found.");
    // } else {
    //     res.send(result);
    // }
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    // if (job != undefined && name != undefined) {
    //     let result = findUserByNameAndJob(name, job);
    //     result = { users_list: result };
    //     res.send(result);
    // } else if (name != undefined) {
    //     let result = userServices.findUserByName(name);
    //     result = { users_list: result };
    //     res.send(result);
    // } else {
    //     res.send(users);
    // }
    if (job != undefined && name != undefined) {
        const userByName = userServices.findUserByName(name);
        const userByJob = userServices.findUserByJob(job);

        const filteredUsers = usersByName.filter(user =>
            usersByJob.some(jobUser => jobUser._id.equals(user._id))
        );
        res.send(filteredUsers);
    }
    else if (name != undefined) {
        userServices.findUserByName(name)
            .then((user) => {
                if (!user) {
                    res.status(404).send("User not found");
                }
                else {
                    res.send(user);
                }
            })
            .catch((error) => {
                res.status(500).send("Error finding user by name.");
            })
    }
    else if (job != undefined) {
        userServices.findUserByJob(job)
            .then((user) => {
                if (!user) {
                    res.status(404).send("User not found");
                }
                else {
                    res.send(user);
                }
            })
            .catch((error) => {
                res.status(500).send("Error finding user by job.");
            })
    }
    else {
        userServices.getUsers()
        .then((users) => {
            res.send({users_list: users});
        })
        .catch((error) => {
            res.status(500).send("Error fetching users.");
        });
    }
});

app.get("/", (req, res) => {
    res.send("localhost:8000/users");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

/*
*
* Make this code asynchronous.
* findUserById is the thing that takes time.
* .then part will be if statement
* .catch error status 404
app.get('/users/:id',
    (req, res) => {
        const id = req.params['id'];
        let result = findUserById(id);
        if (result === undefined) {
            res.status(404)
                .send('Resource not found.');
        } else {
            res.send(result);
        }
    }
);
============================================
app.get('/users/:id',
    (req, res) => {
        const id = req.params['id'];
        //Asynch part:
        findUser = new Promise ( (resolve, reject) =>
        {
            user = findUserById(id);
            if(user === undefined)
                reject("User Undefined");
            else
                resolve (user );    
        });
        // Promise waiting part
        findUser.then ( (result ) => {
            if(result.length() == 0)
                throw new Error("not found");
            else
                res.status(200).send(result);
            })
        .catch( (error) => res.status(404).send(error) );

    }
);

*/