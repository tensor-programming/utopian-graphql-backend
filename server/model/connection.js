import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/u-chat'

async function run () {
  await mongoose.connect(mongoUrl, { useMongoClient: true })
    .then(() => console.log('Connected to Mongo'))
}

run().catch(err => console.error(err))
