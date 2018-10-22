import { Group, Message, User } from '../../model'
import { pubsub } from '../pubsub'

export const createUser = async (obj, args, context) =>
  User.create({ steemName: args.name })

export const createGroup = async (obj, args, context) =>
  Group.create({ name: args.name, members: [args.from] })
    .then(group => User.updateOne({ _id: args.from }, { $addToSet: { groups: group._id } })
      .then(() => group))
    .catch(e => {
      console.error(e)
      throw e
    })

export const addMessage = async (obj, args, context) => Message.create({
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
