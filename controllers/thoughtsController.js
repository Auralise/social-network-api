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

    User.find({
        username: req.body.username
    })
    .then((user) => {
        if(!user) {
            res.status(404).json({
                message: `No user exists with the username ${req.body.username}.\nPlease provide a user with a valid username`,
            });
            return;
        }

        Thought.create({
            thoughtText: req.body.thought,
            username: req.body.username
        })
        .then((post)=> {
            user.thoughts.push(post._id);
            user.save((err)=> {
                if(err){
                    res.status(500).json({
                        message: "An internal server error occurred",
                        err,
                    });
                    return;
                }
            })
        })
        .catch((err)=> {
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

};

const deleteThought = (req, res) => {

};

const createReaction = (req, res) => {

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