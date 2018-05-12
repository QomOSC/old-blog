import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Tag', new Schema({
  article: {
    type: Number,
    required: [true, 'article']
  },
  tagname: {
    trim: true,
    type: String,
    maxlength: 100,
    lowercase: true,
    required: [true, 'tagname'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}));
