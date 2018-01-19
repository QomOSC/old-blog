import mongoose, { Schema } from 'mongoose';

const emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

const schema = new Schema({
  fname: {
    type: String,
    trim: true,
    required: [true, 'First name required'],
    maxlength: 50
  },
  lname: {
    type: String,
    trim: true,
    required: [true, 'Last name required'],
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
    required: [true, 'Email required'],
    maxlength: 200
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password required']
  },
  username: {
    type: String,
    required: true,
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
    enum: [1, 2, 3],
    required: true,
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
  posts: [{
    type: String,
    trim: true
  }],
  submembers: [{
    type: String,
    trim: true
  }],
});

export default mongoose.model('Member', schema);
