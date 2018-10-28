const fs = require('fs');

module.exports = {
  Query: {
    files: () => {
      // Return the record of files uploaded from your DB or API or filesystem
      return []
    }
  },
  Mutation: {
    singleUpload: async (parent, { file }) =>  {
      const { stream, filename, mimetype, encoding } = await file;

      // 1. Validate file metadata.

      // 2. Stream file contents into local filesystem or cloud storage:
      // https://nodejs.org/api/stream.html

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )

      return { stream, filename, mimetype, encoding };
    }
  }
}