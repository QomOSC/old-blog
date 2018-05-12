import mongoose, { Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({
  _id: {
    type: Number
  },
  author: { // The ID from Member model
    ref: 'User',
    required: [true, 'author'],
    type: Schema.Types.ObjectId,
  },
  title: {
    trim: true,
    type: String,
    maxlength: 100,
    required: [true, 'title'],
  },
  content: {
    trim: true,
    type: String,
    required: [true, 'content'],
  },
  minutes: {
    trim: true,
    type: Number,
  },
  avatar: {
    trim: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  viewers: [{ // The IP of viewers
    trim: true,
    type: String,
  }],
  likes: [{ // The ID of members
    trim: true,
    type: String,
  }],
  type: {
    enum: [1, 2], // 1: Not Accepted, 2: Accepted
    trim: true,
    default: 1,
    type: Number,
    required: true,
  }
}, {
  _id: false,
  usePushEach: true,
});

schema.plugin(AutoIncrement);

export default mongoose.model('Article', schema);
