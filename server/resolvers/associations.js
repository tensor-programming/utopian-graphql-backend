import { Message, User, Group } from '../model'

export const groupResolve = {
  async members (obj) {
    return User.find({ groups: { $in: [obj._id] } }).exec()
  },
  async messages (obj) {
    return Message.find({
      toGroup: obj._id
    }).sort({ createdAt: -1 })
  }
}

export const messageResolve = {
  async from (obj) {
    return User.findById(obj.from)
  },
  async toGroup (obj) {
    return Group.findById(obj.toGroup)
  }
}
