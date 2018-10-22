import { withFilter } from 'graphql-subscriptions'
import { pubsub } from '../pubsub'

export const newMessage = {
  subscribe: withFilter(
    async () => pubsub.asyncIterator('newMessage'),
    (payload, args) => {
      return payload.newMessage.toGroup === args.groupId
    }
  )
}

export const peerJoined = {
  subscribe: withFilter(
    async () => pubsub.asyncIterator('peerJoined'),
    (payload, args) => {
      return true
    }
  )
}

export const peerLeft = {
  subscribe: withFilter(
    async () => pubsub.asyncIterator('peerLeft'),
    (payload, args) => {
      return true
    }
  )
}
