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
