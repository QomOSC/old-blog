import mongoose, { Schema } from 'mongoose';

export default mongoose.model('ActivationLink', new Schema({
  code: {
    trim: true,
    type: String,
    required: true,
  },
  user: {
    trim: true,
    ref: 'User',
    unique: true,
    required: true,
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 5,
  }
}));
