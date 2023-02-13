const { Thought, User } = require("../models");


const getAllThoughts = (req, res) => {
    Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json({
            message: "An internal server error occurred",
            err
        }));
};

const getThoughtById = (req, res) => {
    Thought.findById(req.param.thoughtId)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "No thought with this ID",
                });
                return;
            }

            res.status(200).json(post);

        })
        .catch((err) => {
            res.status(500).json({
                message: "An internal server error occurred",
                err
            });
        })
};

const createThought = (req, res) => {
    if (!req.body.thought || !req.body.username) {
        res.status(400).json({
            message: "Please include both a thought and a username in the request body",
        });
        return;
    }

    User.findOne({
        username: req.body.username
    })
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: `No user exists with the username ${req.body.username}.\nPlease provide a user with a valid username`,
                });
                return;
            }

            Thought.create({
                thoughtText: req.body.thought,
                username: req.body.username
            })
                .then((post) => {
                    user.thoughts.push(post._id);
                    user.save((err) => {
                        if (err) {
                            res.status(500).json({
                                message: "An internal server error occurred",
                                err,
                            });
                            return;
                        }

                        res.status(201).json({
                            message: "Thought has been successfully added",
                            thought: post
                        });

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


const updateThought = (req, res) => {

    if (!req.body.thoughtText) {
        res.status(400).json({
            message: "Please include a thoughtText property in the body of the request",
        });
        return;
    }

    Thought.findByIdAndUpdate(req.params.thoughtId, {
        thoughtText: req.body.thoughtText,
    }, {
        new: true
    })
        .then((thought) => {
            res.status(200).json({
                message: "Thought successfully updated",
                thought,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "An internal server error occurred",
                err
            });
        })


};

const deleteThought = (req, res) => {
    Thought.findByIdAndDelete(req.params.thoughtId)
        .then((deletedThought) => {

            User.findOne({
                username: deletedThought.username,
            })
                .then((user) => {
                    user.thoughts.splice(user.thoughts.indexOf(deletedThought._id), 1);
                    user.save((err) => {
                        if (err) {
                            res.status(500).json({
                                message: "An internal server error occurred",
                                err
                            });
                            return;
                        }

                        res.status(200).json({
                            message: "Successfully deleted thought",
                            deletedThought
                        })
                    })
                })


        })
        .catch((err) => {
            res.status(500).json({
                message: "An internal server error occurred",
                err
            });
        })

};

const createReaction = (req, res) => {

    if (!req.body.reaction || !req.body.username) {
        res.status(400).json({
            message: "Please include the reaction and username properties in the request body",
        });
        return;
    }

    Thought.findById(req.params.thoughtId)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "No thought with that ID found",
                });
                return;
            }

            User.findOne({
                username: req.body.username,
            })
                .then((user) => {
                    if (!user) {
                        res.status(404).json({
                            message: "A user with that username does not exist",
                        });
                        return;
                    }


                    post.reactions.push({
                        reactionBody: req.body.reaction,
                        username: user.username,
                    });

                    post.save((err) => {
                        if(err){
                            res.status(500).json({
                                message: "An internal server error occurred",
                                err
                            });
                            return;
                        }
                        res.status(201).json({
                            message: "Successfully created a new reaction",
                            post
                        });
                    })

                })
                .catch((err) => {
                    throw new Error(err);
                });



        })
        .catch((err) => {
            res.status(500).json({
                message: "An internal server error occured",
                err
            });
        });

};
const deleteReaction = (req, res) => {

};


module.exports = {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}