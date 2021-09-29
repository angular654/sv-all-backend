const configs = require('./schemas/Config');
const events  = require('./schemas/Event');
const mongoose = require("mongoose");
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
    mongoose.connect('mongodb://localhost:27017/sv-history');
    await fastify.listen(7070)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()