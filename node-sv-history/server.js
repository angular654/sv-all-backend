const configs = require('./schemas/Config');
const events  = require('./schemas/Event');
const mongoose = require("mongoose");

const dotenv = require('dotenv')
const {MONGO_HOST, MONGO_PORT, MONGO_DB, SV_HISTORY_PORT_INT} = dotenv.config({path: '../.env'}).parsed

const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-cors'), {})
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})
 
// fastify.post('/save-config', async (request,reply) => {
//   res = await configs.create(data)
//   reply.send(res)
// })

// fastify.post('/save-event', async (request,reply) => {
//   res = await events.create(data)
//   reply.send(res)
// })

fastify.get('/configs', async (request,reply) => {
  res = await configs.find({})
  reply.send(res)
})

fastify.get('/events', async (request,reply) => {
  res = await events.find({})
  reply.send(res)
})

fastify.post('/delete-events', async (request,reply) => {
  res = await events.deleteMany({})
  reply.send(res)
})

fastify.post('/delete-configs', async (request,reply) => {
  res = await configs.deleteMany({})
  reply.send(res)
})

const start = async () => {
  try {
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
    await fastify.listen(SV_HISTORY_PORT_INT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()