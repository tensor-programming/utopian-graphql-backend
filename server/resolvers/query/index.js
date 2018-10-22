import { Group, Message, User } from '../../model'

export const allGroups = async (obj, args, context) => Group.find({})

export const group = async (obj, args, context) => Group.findById(args.id)

export const messagesByGroup = async (obj, args, context) =>
  'groupId' in args
    ? Message.find({ toGroup: args.groupId })
    : Message.find({})

export const usersByGroup = async (obj, args, context) =>
  'groupId' in args
    ? User.find().getGroupById(args.id)
    : User.find({})

export const findUser = async (obj, args, context) =>
  'name' in args
    ? User.findOne({ steemName: args.name })
    : User.findById(args.id).exec()
