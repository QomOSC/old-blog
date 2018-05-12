import mongoose, { Schema } from 'mongoose';

import { email } from 'Root/utils/validator';

export default mongoose.model('Comment', new Schema({
  name: {
    trim: true,
    type: String,
    maxlength: 80,
    required: [true, 'name'],
  },
  email: {
    trim: true,
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
  description: {
    trim: true,
    type: String,
    required: [true, 'description'],
  },
  admin: {
    trim: true,
    type: String,
  },
  answer: {
    trim: true,
    type: String,
  },
  type: {
    default: 1,
    trim: true,
    type: Number,
    required: [true, 'type'],
    enum: [1, 2], // 1: requested, 2: accepted
  },
  contact: {
    trim: true,
    default: true,
    required: [true, 'contact'],
    type: Boolean, // true = it's from /contact,   false = it's from an article
  },
  article: {
    trim: true,
    type: Number,
  },
  author: {
    ref: 'User',
    required: [true, 'author'],
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}));
