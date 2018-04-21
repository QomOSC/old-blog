import mongoose, { Schema } from 'mongoose';

import { email } from 'Root/utils/validator';

export default mongoose.model('Newsletter', new Schema({
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
  }
}));
