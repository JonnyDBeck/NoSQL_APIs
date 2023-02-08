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
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1
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
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1
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
            type: [reactionSchema]
        }
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;