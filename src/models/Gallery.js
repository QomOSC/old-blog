import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'title'],
    maxlength: 150
  },
  photo: {
    type: String,
    trim: true,
    required: [true, 'photo'],
    maxlength: 100
  },
  photographer: {
    type: String,
    trim: true,
    required: [true, 'photographer'],
    maxlength: 60
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Gallery', schema);
