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

export const joinGroup = async (obj, args, context) => {
  return Promise.all([
    User.findByIdAndUpdate(args.from, { $addToSet: { groups: args.groupId } }),
    Group.updateOne({ _id: args.groupId }, { $addToSet: { members: args.from } })
  ]).then((cols) => {
    pubsub.publish('peerJoined', { peerJoined: `User ${args.from} joined the group ${args.groupId}` })
    return Group.findById(args.groupId)
  }).catch(e => {
    console.error(e)
    throw e
  })
}

export const leaveGroup = async (obj, args, context) => {
  return Promise.all([
    User.findByIdAndUpdate(args.from, { $pull: { groups: args.groupId } }).exec(),
    Group.updateOne({ _id: args.groupId }, { $pull: { members: args.from } })
  ]).then((cols) => {
    pubsub.publish('peerLeft', { peerLeft: `User ${args.from} left the group ${args.groupId}` })
    return Group.findById(args.groupId)
  }).catch(e => {
    console.error(e)
    throw e
  })
}

export const addMessage = async (obj, args, context) => Message.create({
  content: args.content,
  from: args.from,
  toGroup: args.groupId
}).then((msg) => {
  Promise.all([
    Group.findByIdAndUpdate(args.groupId, { $addToSet: { messages: msg._id } }).exec(),
    User.findByIdAndUpdate(args.from, { $addToSet: { messages: msg._id } }).exec()
  ])
  return msg
}).then((msg) => {
  pubsub.publish('newMessage', { newMessage: msg })
  return msg
}).catch(e => {
  console.error(e)
  throw e
})
