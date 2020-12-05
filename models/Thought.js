const { Schema, model, Types } = require('mongoose');
const dateFormat = require('dateformat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: 'You must enter a reaction',
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: 'You must enter a name',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDate) =>
        dateFormat(createdAtDate, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtBody: {
      type: String,
      required: 'You must enter a thought',
      minlength:1,
      maxlength: 280, // see twitter
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDate) =>
        dateFormat(createdAtDate, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
    },
    username: {
      type: String,
      required: 'You must enter a name'
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total number of reactions to a thought
ThoughtSchema.virtual('reactionNumber').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;