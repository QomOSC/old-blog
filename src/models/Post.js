import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const schema = new Schema({
  author: { // The ID from Member model
    type: Schema.Types.ObjectId,
    ref: 'Member',
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
  }]
});

autoIncrement.initialize(mongoose);

schema.plugin(autoIncrement.plugin, 'Post');

export default mongoose.model('Post', schema);
