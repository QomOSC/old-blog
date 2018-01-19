import mongoose, { Schema } from 'mongoose';

const emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

const schema = new Schema({
  fname: { // First Name
    type: String,
    trim: true,
    required: [true, 'fname'],
    maxlength: 50
  },
  lname: { // Last Name
    type: String,
    trim: true,
    required: [true, 'lname'],
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator(v) {
        return emailValidate.test(v);
      },
      message: 'It is not a valid email'
    },
    required: [true, 'email'],
    maxlength: 200
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password']
  },
  username: {
    type: String,
    required: [true, 'username'],
    trim: true,
    unique: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    required: false,
    maxlength: 250
  },
  type: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, 'type'],
    trim: true,
    default: 1
  },
  avatar: {
    type: String,
    trim: true,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  posts: [{ // The ID of your posts
    type: String,
    trim: true
  }],
  submembers: [{ // The ID of those members who request and you accept
    type: String,
    trim: true
  }],
});

export default mongoose.model('Member', schema);
