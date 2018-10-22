import mongoose from 'mongoose'

const { Schema } = mongoose

const Message = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  from: { type: Schema.Types.ObjectId, ref: 'user' },
  toGroup: { type: Schema.Types.ObjectId, ref: 'group' }
})

export default mongoose.model('message', Message)
