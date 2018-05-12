import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Conference', new Schema({
  providers: [{ // The ID from Member model
    trim: true,
    type: String,
  }],
  author: {
    trim: true,
    type: String,
  },
  title: {
    trim: true,
    type: String,
    maxlength: 100,
    required: [true, 'title'],
  },
  description: {
    trim: true,
    type: String,
    required: [true, 'content'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  attenders: [{
    trim: true,
    type: String,
  }],
  type: { // 1: just requested 2: declined 3: accepted 4: done
    default: 1,
    trim: true,
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, 'type'],
  },
  start: {
    trim: true,
    type: String,
    required: true,
  },
  end: {
    trim: true,
    type: String,
    required: true,
  },
  galleries: [{
    trim: true,
    type: String,
  }],
  embeds: [{
    trim: true,
    type: String,
  }],
  done: {
    type: Boolean,
    default: false,
  }
}, {
  usePushEach: true,
}));
