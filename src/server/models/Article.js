import mongoose, { Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({
  _id: {
    type: Number
  },
  author: { // The ID from Member model
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'title'],
    maxlength: 100,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'content'],
    trim: true
  },
  minutes: {
    type: Number,
    required: false,
    trim: true
  },
  avatar: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  viewers: [{ // The IP of viewers
    type: String,
    trim: true
  }],
  likes: [{ // The ID of members
    type: String,
    trim: true
  }],
  type: {
    enum: [1, 2], // 1: Not Accepted, 2: Accepted
    type: Number,
    required: true,
    default: 1,
    trim: true
  }
}, {
  _id: false,
  usePushEach: true
});

schema.plugin(AutoIncrement);

export default mongoose.model('Article', schema);
