const { connect, connection } = require('mongoose');

connect('mongodb://localhost/UserThoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
