const express = require('express') // handles the ReST requests
const app = express() // instantiate the joint.
const bodyParser = require('body-parser') // so we can receive JSON POST requests.
const http = require('http').Server(app) // this is a server, could be https but heroku will do that for us

const port = process.env.PORT || 8081 // Heroku will provide the port
const connection = process.env.DATABASE_URL || '[::1]:5432/public' // heroku will set the DATABSE_URL when adding it to a project.

const knex = require('knex')({ client: 'pg', connection }) // for our postgres connection
const writeToDb = record => knex('transactions').insert(record) // simple datbase write function.

app.use(bodyParser.json()) // yeah.. cause we really want that JSON

// create a schema if it's not there... this is weird to have here but, trying to keep it simple.
knex.schema.hasTable('transactions').then(function(exists) { // uh I think the code explains itself
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
    const result = await writeToDb(body)
    res.send({success: true})
  } catch ({message}) { res.status(500).send({success: false, message }) }
})

app.get('/records', async (req, res) =>  {
  try {
    const transactions = await knex('transactions').orderBy('transdate', 'desc')
    res.send(transactions)
  } catch ({message}) { res.status(500).send({success: false, message, transactions: []}) }
})

http.listen(port, () => console.log('listening on *:' + port) ) // fire this puppy up.
