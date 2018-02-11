import mongoose, { Schema } from 'mongoose';

import { validator } from '../utils';

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
        return validator.e(v);
      },
      message: 'It is not a valid email'
    },
    required: [true, 'email'],
    maxlength: 200
  },
  title: {
    type: String,
    required: [true, 'title'],
    maxlength: 100,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'content'],
    trim: true
  },
  type: {
    type: Number,
    enum: [1, 2], // 1: requested, 2: accepted
    required: [true, 'type'],
    trim: true,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Opinion', schema);
