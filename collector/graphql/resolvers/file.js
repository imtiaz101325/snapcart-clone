const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const knex = require('../../database');

module.exports = {
  Query: {
    files: () => {
      // Return the record of files uploaded from your DB or API or filesystem
      return []
    }
  },
  Mutation: {
    singleUpload: async (parent, { file, userid }) =>  {
      const { stream, filename } = await file;

      //TODO: Validate file metadata.

      //TODO: Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html
      const uuid = shortid.generate();
      const localFileName = `${userid}-${uuid}-${filename}`;
      const filepath = path.join(__dirname, "../../public/images", localFileName);
      try {
        const fsresult = await new Promise((resolve, reject) =>
          stream
            .on('error', error => {
              if (stream.truncated)
                // Delete the truncated file
                fs.unlinkSync(filepath)
              reject(error)
            })
            .pipe(fs.createWriteStream(filepath))
            .on('error', error => reject(error))
            .on('finish', () => resolve({ uuid, filename: localFileName }))
        );

        console.log(fsresult);

        const user = await knex('users').where('googleid', userid);

        const dbresult = await knex('uploads').insert({
          userid: user[0].id,
          fileid: uuid,
          path: filepath
        });

        console.log(dbresult)

        return uuid;
      } catch(err) {
        console.log(err);
        return null;
      }
    }
  }
}