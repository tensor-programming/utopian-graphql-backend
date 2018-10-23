import { withFilter } from 'graphql-subscriptions'
import { pubsub } from '../pubsub'

export const newMessage = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('newMessage'),
    (payload, args) => {
      console.log(payload.newMessage)
      return payload.newMessage.toGroup.toString() === args.groupId.toString()
    }
  )
}

export const peerJoined = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('peerJoined'),
    (payload, args) => {
      return true
    }
  )
}

export const peerLeft = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('peerLeft'),
    (payload, args) => {
      return true
    }
  )
}
