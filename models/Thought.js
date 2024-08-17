const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Schema for Reaction - This will be a subdocument schema within the `Thought` model.
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Schema to create the Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual field `reactionCount` to get the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize and export the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;