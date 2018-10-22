import { withFilter } from 'graphql-subscriptions'
import { pubsub } from '../../subscriptions'

export const newMessage = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('newMessage'),
    (payload, args) => {
      return payload.newMessage.toGroup === args.groupId
    }
  )
}
