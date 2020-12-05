const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: 'You need to enter a username',
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: 'You must enter an email address',
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    // connect thoughts
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // connect friends
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get number of user's friends
UserSchema.virtual('friendNumber').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;