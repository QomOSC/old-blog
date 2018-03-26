import mongoose, { Schema } from 'mongoose';

import { validator } from '../utils';

const schema = new Schema({
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
  }
});

export default mongoose.model('Newsletter', schema);
