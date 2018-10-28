const knex = require('./index');

const upsert = (id, type, user = {}) => 
  knex('users').where(type, id).then(res => {
    if (res.length === 0) {
      return knex('users').insert({ ...user }).then(() => {
        return knex('users').where(type, id).then(
          res => res[0]
        );
      });
    } else {
      return res[0];
    }
  });

module.exports = {
  upsert
}