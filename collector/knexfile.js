// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db',
      database: 'snclone',
      user: 'postgres',
      password: 'securepassftw',
    },
    migrations: {
      directory: './migrations'
    },
    // seeds: {
    //   directory: './db/seeds/dev'
    // },
    useNullAsDefault: true
  },

  // test: {
  //   client: 'pg',
  //   connection:'postgres://localhost/<examples_test>',
  //   migrations: {
  //     directory: './db/migrations'
  //   },
  //   seeds: {
  //     directory: './db/seeds/test'
  //   },
  //   useNullAsDefault: true
  // },

  // production: {
  //   client: 'pg',
  //   connection: process.env.DATABASE_URL,
  //   migrations: {
  //     directory: './db/migrations'
  //   },
  //   seeds: {
  //     directory: './db/seeds/production'
  //   },
  //   useNullAsDefault: true
  // },

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
