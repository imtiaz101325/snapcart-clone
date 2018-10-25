const knex = require('./index');

const upsert = (id, type, user = {}) => 
  knex.transaction(trx => {
    trx('users').where(type, id).then(res => {
      if (res.length === 0) {
        return trx('users').insert({ ...user }).then(() => {
          return trx('users').where(type, id);
        });
      } else {
        return res;
      }
    });
  })

module.exports = {
  upsert
}