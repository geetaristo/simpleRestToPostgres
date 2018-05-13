const express = require('express')
const app = express()
const http = require('http').Server(app)

const port = process.env.PORT || 8081
const connection = process.env.DATABASE_URL || 'postgresql://[::1]:5432/public'

const knex = require('knex')({ client: 'pg', connection })
const writeToDb = record => knex('transactions').insert(record)

knex.schema.hasTable('transactions').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('transactions', function(t) {
      t.string('id').primary()
      t.dateTime('transdate')
      t.jsonb('data')
    })
  }
})

app.get('/', (req, res) => res.send('welcome to the root of this server.') )

app.post('/record', async (req, res) => {
  const { body } = req
  try {
    const result = await writeToDb(body.record)
    res.send({success: true})
  } catch ({message}) { res.status(500).send({success: false, message }) }
})

app.get('/records', async (req, res) =>  {
  try {
    const transactions = await knex('transactions').orderBy('transdate', 'desc')
    res.send(transactions)
  } catch ({message}) { res.status(500).send({success: false, message, transactions: []}) }
})

http.listen(port, () => console.log('listening on *:' + port) )
