const { NODE_ENV } = process.env;

const environment = NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

module.exports = require('knex')(configuration);
