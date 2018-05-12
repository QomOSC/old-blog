import mongoose, { Schema } from 'mongoose';

import { email } from 'Root/utils/validator';

export default mongoose.model('Newsletter', new Schema({
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
  verified: {
    trim: true,
    type: Boolean,
    default: false,
  },
  token: {
    trim: true,
    type: String,
  }
}));
