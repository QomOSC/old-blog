import mongoose, { Schema } from 'mongoose';

import { email } from 'Root/utils/validator';

const schema = new Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 80,
    required: [true, 'name']
  },
  email: {
    type: String,
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
  title: {
    type: String,
    maxlength: 100,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'description'],
    trim: true
  },
  admin: {
    type: String,
    trim: true
  },
  answer: {
    type: String,
    trim: true
  },
  type: {
    type: Number,
    enum: [1, 2], // 1: requested, 2: accepted
    required: [true, 'type'],
    trim: true,
    default: 1
  },
  contact: {
    type: Boolean, // true = it's from /contact,   false = it's from an article
    required: [true, 'contact'],
    trim: true,
    default: true
  },
  article: {
    type: Number,
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Member'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Comment', schema);
