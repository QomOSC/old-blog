import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Recovery', new Schema({
  code: {
    trim: true,
    type: String,
    required: [true, 'code'],
  },
  user: {
    trim: true,
    ref: 'User',
    unique: true,
    required: [true, 'user'],
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    trim: true,
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 5,
  }
}));
