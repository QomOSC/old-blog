import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  provider: { // The ID from Member model
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
  description: {
    type: String,
    required: [true, 'content'],
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
  type: { // 1: just requested 2: declined 3: accepted 4: done
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, 'type'],
    trim: true,
    default: 1
  }
});

export default mongoose.model('Conference', schema);
