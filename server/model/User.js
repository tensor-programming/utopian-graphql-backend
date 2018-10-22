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

User.query.getGroupById = function (id) {
  return this.groups.filter((group) => group._id === id)
}

export default mongoose.model('user', User)
