import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Tag', new Schema({
  article: {
    type: Number,
    required: true
  },
  tagname: {
    type: String,
    lowercase: true,
    required: [true, 'tagname'],
    maxlength: 100,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}));
