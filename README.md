# simpleRestToPostgres
How simple can a ReST service be with just write and read

This is a simple server that has two primary routes, a post to receive a message that will be stored in a postgres database.
The body of the post message should be json in the format of:
```
{ 
  id: 'A unique String identifying this transaction',
  transdate: 'A datetime that matches something postgres will recognize',
  data: {message: 'Any json object will go in here' }
}
```

Querying the server at /transactions will return a list of transactions that have been recorded.

* Clone this repo:
  `git clone https://github.com/geetaristo/simpleRestToPostgres.git`
* run npm install
  ` npm install `
* fire this server up
  ` npm start `

* deploy to heroku
  * `git remote add <your heroku app path>`
  * `git commit -am "Some interesting commit message if you've made some changes`
  * `git push heroku master`
