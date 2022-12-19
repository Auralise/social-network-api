const { User } = require("../models");


const getAllUsers = (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({
            message: "An internal server error occurred",
            err
        }));
};

const getUserById = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: "No user with this ID found",
                });
                return;
            }

            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json({
                message: "An internal server error occurred",
                err
            });
        });
};

const createNewUser = (req, res) => {
    if (!req.body.username || !req.body.email) {
        res.status(400).json({
            message: "Please ensure that you include both a username and an email in the request body",
        });
    }

    User.create({
        username: req.body.username,
        email: req.body.email,
        thoughts: [],
        friends: [],
    })
        .then((status) => {
            res.status(201).json({
                message: "Successfully created User",
                status
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "An internal server error occurred",
                err,
            });
        })

};


const updateUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: "No user with this ID found",
                });
                return;
            }
            else if (!req.body.username && !req.body.email) {
                res.status(400).json({
                    message: "Please include either a username or email in the request to update",
                });
                return;
            }

            User.findByIdAndUpdate(req.params.id, {
                username: req.body.username || user.username,
                email: req.body.email || user.email,
            })
                .then((status) => {
                    res.status(200).json({
                        message: "User information successfully updated",
                        status,
                    })
                })
                .catch((err) => {
                    throw new Error(err);
                })


        })
        .catch((err) => {
            res.status(500).json({
                message: "An internal server error occurred",
                err
            });
        });

};

const deleteUser = (req, res) => {

};

const addNewFriend = (req, res) => {

};

const removeFriend = (req, res) => {

};






module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    addNewFriend,
    removeFriend
}