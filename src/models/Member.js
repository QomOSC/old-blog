import mongoose, { Schema } from 'mongoose';


const { validator } = rootRequire('./utils');

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
        return validator.e(v);
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
    validate: {
      validator(v) {
        return validator.u(v);
      },
      message: 'It is not a valid username'
    },
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
  newsletter: {
    type: Number,
    enum: [1, 2], // 1: Active, 2: Deactive
    required: [true, 'newsletter'],
    trim: true,
    default: 1
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
