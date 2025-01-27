// backend.js
import express from "express"; // import express
import cors from "cors";
import userServices from "./user-services.js";

const app = express(); // create an instance of express
const port = 8000; // constant of port 

app.use(cors());
app.use(express.json()); // process incoming data in JSON format

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

    userServices.deleteById(id)
        .then((deletedUser) => {
            if(deletedUser) {
                res.status(204).send();
            } else {
                res.status(404).send("Resource not found.");
            }
        })
        .catch((error) => {
            res.status(500).send("Error deleting ", error);
        });
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
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    userServices.getUsers(name, job)
        .then((users) => {
            res.send({users_list: users });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Error fetching users.");
        });
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