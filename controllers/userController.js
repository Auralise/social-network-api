const { User, Thought } = require("../models");


const getAllUsers = (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({
            message: "An internal server error occurred",
            err
        }));
};

const getUserById = (req, res) => {
    User.findById(req.params.userId)
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
        return;
    }

    User.create({
        username: req.body.username,
        email: req.body.email,
        thoughts: [],
        friends: [],
    })
        .then((user) => {
            res.status(201).json({
                message: "Successfully created User",
                user
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
    User.findById(req.params.userId)
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

            User.findByIdAndUpdate(req.params.userId, {
                username: req.body.username || user.username,
                email: req.body.email || user.email,
            }, {
                new: true,
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
    User.findById(req.params.userId)
    .then((user)=> {
        if(!user){
            res.status(404).json({
                message: "Could not find user with that ID",
            });
            return;
        }

        Thought.deleteMany({
            _id: {$in: user.thoughts},
        })
        .then((thoughtDeletionStats)=>{
            User.findByIdAndDelete(req.params.userId)
            .then((userDeletionStats)=>{
                res.status(200).json({
                    message: "Successfully deleted user and all associated thoughts",
                    userDeletionStats,
                    thoughtDeletionStats
                });
            })
            .catch((err) => {
                throw new Error(err);
            })


        })
        .catch((err)=>{
            throw new Error(err);
        });

        


    })
    .catch((err) => {
        res.status(500).json({
            message: "An internal server error occurred",
            err
        })
    });
};

const addNewFriend = (req, res) => {
    User.findById(req.params.userId)
    .then((user)=> {
        if(!user){
            res.status(404).json({
                message: "No user with this ID found",
            });
            return;
        }
        if(user.friends.includes(req.params.friendId)){
            res.status(400).json({
                message: "These users are already friends",
            });
            return;
        }

        User.findById(req.params.friendId)
        .then((friend)=> {
            if(!friend){
                res.status(404).json({
                    message: "No user with this ID found to add as a friend"
                });
                return;
            }

            user.friends.push(friend._id);
            friend.friends.push(user._id);
            user.save((err)=> {
                if(err){
                    throw new Error(err);
                } 
            });
            friend.save((err)=> {
                if(err){
                    throw new Error(err);
                }

                //include in final callback in case an error was thrown earlier.
                res.status(200).json({
                    message: `Successfully added ${friend.username} as a friend of ${user.username}`
                });
            });
        })
        .catch((err)=> {
            throw new Error(err);
        });
    })
    .catch((err)=> {
        res.status(500).json({
            message: "An internal server error occurred",
            err
        });
    });
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