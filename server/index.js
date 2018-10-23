import { createServer } from 'http'
import express from 'express'

import { typeDefs } from './types'
import resolvers from './resolvers'
import { ApolloServer } from 'apollo-server-express'

const PORT = process.env.PORT || 6001

const app = express()

const apollo = new ApolloServer({
  typeDefs,
  resolvers
})

apollo.applyMiddleware({ app })

const httpServer = createServer(app)

apollo.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, () => {
  console.log(`server ready at http://localhost:${PORT}${apollo.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${apollo.subscriptionsPath}`)
})
