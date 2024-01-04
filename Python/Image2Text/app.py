import pytesseract 
from PIL import Image 
image  = Image.open("sample.jpeg")

text = pytesseract.image_to_string(image)

print(text)
