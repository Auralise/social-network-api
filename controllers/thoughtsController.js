const { Thought } = require("../models");

const getAllThoughts = (req, res) => {
    Thought.find()
    .then((thoughts)=> res.json(thoughts))
    .catch((err)=> res.status(500).json({
        message: "An internal server error occurred",
        err
    }));
};

const getThoughtById = (req, res) => {
    Thought.findById(req.param.thoughtId)
    .then((post) => {
        if(!post){
            res.status(404).json({
                message: "No thought with this ID",
            });
            return;
        }

        res.status(200).json(post);

    })
    .catch((err)=> {
        res.status(500).json({
            message: "An internal server error occurred",
            err
        });
    })
};

const createThought = (req, res) => {
    
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