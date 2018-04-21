import mongoose, { Schema } from 'mongoose';

import { email, username, password } from 'Root/utils/validator';

export default mongoose.model('User', new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'name'],
    maxlength: 100
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator(v) {
        return email(v);
      },
      message: 'It is not a valid email'
    },
    required: [true, 'email'],
    maxlength: 200
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password'],
    validate: {
      validator(v) {
        return password(v);
      },
      message: 'It is not a valid password'
    },
  },
  username: {
    lowercase: true,
    type: String,
    required: [true, 'username'],
    validate: {
      validator(v) {
        return username(v);
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
    maxlength: 250
  },
  type: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, 'type'],
    trim: true,
    default: 1
  },
  verified: {
    type: Boolean,
    required: true,
    trim: true,
    default: false
  },
  avatar: {
    type: String,
    trim: true,
    maxlength: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  articles: [{ // The ID of your articles
    type: Number,
    trim: true
  }],
  submembers: [{ // The ID of those members who request and you accept
    type: String,
    trim: true
  }],
}, { usePushEach: true }));
