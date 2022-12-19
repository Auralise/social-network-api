const { Schema, Types } = require("mongoose");
const DateTime = require("luxon");


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //TODO: test - Documentation reports Date.now returns milliseconds, this getter will need to be reviewed once data is in
        get: v => DateTime.fromMillis(v),
    }
});


module.export = reactionSchema;