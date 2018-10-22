import { makeExecutableSchema } from 'graphql-tools'
import { readFileSync } from 'fs'
import { join } from 'path'
import resolvers from './resolvers'

const schema = readFileSync(join(__dirname, './schema.graphql'), {
  encoding: 'utf8'
})

const executeSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})

export default executeSchema
