import { createServer } from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import cors from 'cors'

import { execute, subscribe } from 'graphql'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import schema from './schema'

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(compress())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const server = createServer(app)

const subServer = new SubscriptionServer({ schema, execute, subscribe }, { server, path: '/subscriptions' })

app.use('graphql', graphqlExpress(req => {
  const query = req.query.query || req.body.query
  if (query && query.length > 2000) {
    throw new Error('Query too large')
  }
  const { headers } = req
  return {
    context: { headers },
    rootValue: {},
    schema
  }
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.use('*', (req, res) => {
  res.redirect('/graphiql')
})

server.listen(PORT, () => {
  subServer()
  console.log(`API Server is now running on http://localhost:${PORT}`)
})
