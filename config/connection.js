const {connect, connection } = require("mongoose");


connect("mongodb://localhost:27017/social-media-collection-18", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

module.exports = connection;