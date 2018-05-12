import mongoose, { Schema } from 'mongoose';

import { email, username, password } from 'Root/utils/validator';

export default mongoose.model('User', new Schema({
  name: {
    trim: true,
    type: String,
    maxlength: 100,
    required: [true, 'name'],
  },
  email: {
    trim: true,
    unique: true,
    type: String,
    maxlength: 200,
    lowercase: true,
    required: [true, 'email'],
    validate: {
      validator(v) {
        return email(v);
      },
      message: 'Not a valid email'
    },
  },
  password: {
    trim: true,
    type: String,
    required: [true, 'password'],
    validate: {
      validator(v) {
        return password(v);
      },
      message: 'Not a valid password'
    },
  },
  username: {
    trim: true,
    unique: true,
    type: String,
    maxlength: 100,
    lowercase: true,
    required: [true, 'username'],
    validate: {
      validator(v) {
        return username(v);
      },
      message: 'Not a valid username'
    },
  },
  description: {
    trim: true,
    type: String,
    maxlength: 250
  },
  type: {
    default: 1,
    trim: true,
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, 'type']
  },
  verified: {
    trim: true,
    type: Boolean,
    default: false,
    required: true,
  },
  avatar: {
    trim: true,
    type: String,
    maxlength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  articles: [{ // The ID of your articles
    type: Number,
    trim: true
  }],
  submembers: [{ // The ID of those members who request and you accept
    type: String,
    trim: true
  }],
}, {
  usePushEach: true,
}));
