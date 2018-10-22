import { Group, Message, User } from '../../model'
import pubsub from '../../pubsub'

export const createUser = (obj, args, context) =>
  User.create({ steemName: args.name })

export const createGroup = (obj, args, context) =>
  Group.create({ name: args.name }, { $addToSet: { members: args.from } })
    .then(group => User.update({ _id: args.from }, { $addToSet: { groups: group._id } })
      .then(() => group))
    .catch(e => {
      console.error(e)
      throw e
    })

export const addMessage = (obj, args, context) => Message.create({
  content: args.content,
  from: args.from,
  toGroup: args.groupId
}).then((msg) => {
  pubsub.publish('newMessage', { newMessage: msg })
  return msg
}).catch(e => {
  console.error(e)
  throw e
})
