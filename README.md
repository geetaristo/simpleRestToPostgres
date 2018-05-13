# simpleRestToPostgres
How simple can a ReST service be with just write and read

This is a simple server that has two primary routes, a post to receive a message that will be stored in a postgres database.
The body of the post message should be json in the format of:
{ id: 'A unique String identifying this transaction',
  transdate: 'A datetime that matches something postgres will recognize',
  data: {message: 'Any json object will go in here' }
}
