const knex = require('../../database');
const userMethods = require('../../database/user');

module.exports = {
  Query: {
    user: (_, { id, type }) => knex('users').where(type, id).then( res => res[0] ),
    users: () => knex.select().from('users'),
  },
  Mutation: {
    upsertUser: (_, { id, type, user }) => userMethods.upsert(id, type, user)
  }
}