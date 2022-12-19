const { User } = require("../models");


const getAllUsers = (req, res) => {
    User.find()
    .then((users)=> res.json(users))
    .catch((err) => res.status(500).json({
        message: "An internal server error occurred",
        err
    }));
};

const getUserById = (req, res) => {
    User.findById(req.params.id)
    .then((user)=> {
        if(!user){
            res.status(404).json({
                message: "No user with this ID found",
            });
            return;
        } 

        res.status(200).json(user);
    })
    .catch((err)=> {
        res.status(500).json({
            message: "An internal server error occurred",
            err
        });
    });
};

const createNewUser = (req, res) => {

};


const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

const getUsersFriends = (req, res) => {

};

const addNewFriend = (req, res) => {

};

const removeFriend  = (req, res) => {

};






module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    getUsersFriends,
    addNewFriend,
    removeFriend
}