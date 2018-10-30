import records
import os
from PIL import Image
import pytesseract

db = records.Database(os.environ.get('DATABASE_URI'));
rows = db.query('select * from uploads')

filename = rows[0].path.split('/')[-1]
filepath = os.path.join(os.getcwd(), 'images', filename)

img = Image.open(filepath)
result = pytesseract.image_to_string(img, lang="eng")

print(result)