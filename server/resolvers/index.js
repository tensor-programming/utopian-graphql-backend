import { allGroups, group, messagesByGroup, usersByGroup, findUser } from './query'
import { createUser, createGroup, addMessage } from './mutations'
import { newMessage } from './subscriptions'
import { messageResolve, groupResolve } from './associations'

export default {
  Query: {
    allGroups,
    group,
    messagesByGroup,
    usersByGroup,
    findUser
  },
  Group: groupResolve,
  Message: messageResolve,
  Mutation: {
    createUser,
    createGroup,
    addMessage
  },
  Subscriptions: {
    newMessage
  }
}
