import records
import os

db = records.Database(os.environ.get('DATABASE_URI'));
rows = db.query('select * from uploads')

for row in rows:
  print(row.userid, row.path)