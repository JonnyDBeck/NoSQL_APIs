const { Schema, model } = require('mongoose');
// I am not formatting a date without moment, okay
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            required: true,
            default: null
        },
        reactionBody: {
            type: Date,
            required: true,
            validate: validate({
                validator: 'isLength',
                arguments: [1, 280],
                message: 'Name should be between 1 and 280 characters'
            }),
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => moment(date).format('YYYY-MM-DD'),
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughText: {
            type: String,
            required: true,
            validate: validate({
                validator: 'isLength',
                arguments: [1, 280],
                message: 'Name should be between 1 and 280 characters'
            }),
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => moment(date).format('YYYY-MM-DD'),
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            type: reactionSchema
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;