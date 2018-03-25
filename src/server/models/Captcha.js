import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  captcha: {
    type: String,
    trim: true,
    required: true,
    maxlength: 10
  }
});

export default mongoose.model('Captcha', schema);
