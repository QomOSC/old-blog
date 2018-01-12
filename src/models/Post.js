import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Member'
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Post', schema);
