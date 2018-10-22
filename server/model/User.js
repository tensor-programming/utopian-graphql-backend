import mongoose from 'mongoose'

const { Schema } = mongoose

const User = new Schema({
  steemName: String,
  avatar: {
    type: String
  },
  messages: [{ type: Schema.Types.ObjectId, ref: 'message' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'group' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('user', User)
