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
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: "Could not find user with that ID",
                });
                return;
            }

            Thought.deleteMany({
                _id: { $in: user.thoughts },
            })
                .then((thoughtDeletionStats) => {
                    // Thought needs to be put into how to remove the user ID from friends lists. This would be where it is done
                    User.findByIdAndDelete(req.params.userId)
                        .then((userDeletionStats) => {
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
                .catch((err) => {
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
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: "No user with this ID found",
                });
                return;
            }

            if (user.friends.includes(req.params.friendId)) {
                res.status(400).json({
                    message: "These users are already friends",
                });
                return;
            }

            User.findById(req.params.friendId)
                .then((friend) => {
                    if (!friend) {
                        res.status(404).json({
                            message: "No user with this ID found to add as a friend"
                        });
                        return;
                    }

                    user.friends.push(friend._id);
                    friend.friends.push(user._id);
                    user.save((err) => {
                        if (err) {
                            res.status(500).json({
                                message: "An internal server error occurred",
                                err
                            });
                            return;
                        }
                    });
                    friend.save((err) => {
                        if (err) {
                            res.status(500).json({
                                message: "An internal server error occurred",
                                err
                            });
                            return;
                        }

                        //include in final callback in case an error was thrown earlier.
                        res.status(200).json({
                            message: `Successfully added ${friend.username} as a friend of ${user.username}`
                        });
                    });
                })
                .catch((err) => {
                    throw new Error(err);
                });
        })
        .catch((err) => {
            res.status(500).json({
                message: "An internal server error occurred",
                err
            });
        });
};

const removeFriend = (req, res) => {
    User.findById(req.params.userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: "No user with this ID could be found",
                });
                return;
            }

            if (!user.friends.includes(req.params.friendId)) {
                res.status(400).json({
                    message: "This user does not have any friends with this ID",
                });
                return;
            }

            User.findById(req.params.friendId)
                .then((friend) => {
                    //As there may be stub friend IDs, we need to check the friend exists. If not, we will just remove it from the original users list
                    if (!friend) {
                        user.friends.splice(user.friends.indexOf(req.params.friendId), 1);
                        user.save((err) => {
                            if (err) throw new Error(err);

                            res.status(200).json({
                                message: "Successfully removed friend"
                            });

                        });
                    } else {
                        friend.friends.splice(friend.friends.indexOf(req.params.userId), 1);
                        user.friends.splice(user.friends.indexOf(req.params.friendId), 1);
                        friend.save((err) => {
                            if (err) {
                                res.status(500).json({
                                    message: "An internal server error occurred",
                                    err,
                                });
                                return;
                            }
                        })
                        user.save((err) => {
                            if (err) {
                                res.status(500).json({
                                    message: "An internal server error occurred",
                                    err
                                });
                                return;
                            }
                            res.status(200).json({
                                message: "Successfully removed friend",
                            });
                        })
                    }
                })

        })
        .catch((err) => {
            res.status(500).json({
                message: "An internal server error occurred",
                err,
            });
        });

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