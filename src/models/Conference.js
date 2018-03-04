import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const schema = new Schema({
  providers: [{ // The ID from Member model
    type: String,
    trim: true
  }],
  author: {
    type: String,
    trim: true
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
  attender: [{
    type: String,
    trim: true
  }],
  type: { // 1: just requested 2: declined 3: accepted 4: done
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, 'type'],
    trim: true,
    default: 1
  }
});

autoIncrement.initialize(mongoose);

schema.plugin(autoIncrement.plugin, 'Conference');

export default mongoose.model('Conference', schema);
