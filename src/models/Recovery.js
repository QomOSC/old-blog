import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  token: {
    type: String,
    required: true,
    trim: true
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    unique: true,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    expires: 60 * 60 * 5,
    default: Date.now
  }
});

export default mongoose.model('Recovery', schema);
