import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

export function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
        promise = userModel.find();
    } else if (name && job) {
        promise = findUserByNameAndJob(name, job);
    } else if (name) {
        promise = findUserByName(name);
    } else if (job) {
        promise = findUserByJob(job);
    }
    return promise;
}

export function findUserById(id) {
    return userModel.findById(id);
}

export function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

export function findUserByName(name) {
    return userModel.find({ name: name });
}

export function findUserByJob(job) {
    return userModel.find({ job: job });
}
export function findUserByNameAndJob(name, job) {
    return userModel.find({ name: name, job: job });
}

export function deleteById(id) {
    return userModel.findByIdAndDelete(id);
}