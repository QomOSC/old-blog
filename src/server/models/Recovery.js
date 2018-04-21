import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Recovery', new Schema({
  code: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    expires: 60 * 60 * 5,
    default: Date.now
  }
}));
