import { Message, User, Group } from '../model'

export const groupResolve = {
  members (obj) {
    return User.find({ _groups: { $in: obj._id } })
  },
  messages (obj) {
    return Message.find({
      toGroup: obj._id
    }).sort({ createdAt: -1 })
  }
}

export const messageResolve = {
  from (obj) {
    return User.findById(obj.from)
  },
  toGroup (obj) {
    return Group.findById(obj.toGroup)
  }
}
