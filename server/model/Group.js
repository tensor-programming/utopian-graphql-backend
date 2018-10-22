import mongoose from 'mongoose'

const { Schema } = mongoose

const Group = new Schema({
  name: {
    type: String,
    unique: true
  },
  avatar: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'user', default: [] }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'message', default: [] }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('group', Group)
