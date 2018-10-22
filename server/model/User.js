import mongoose from 'mongoose'

const { Schema } = mongoose

const User = new Schema({
  steemName: {
    type: String,
    unique: true
  },
  avatar: {
    type: String
  },
  messages: [{ type: Schema.Types.ObjectId, ref: 'message', default: [] }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'group', default: [] }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

User.query.getGroupById = function (id) {
  return this.groups.filter((group) => group._id === id)
}

export default mongoose.model('user', User)
