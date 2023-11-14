import qrcode as qr

img = qr.make("hi World")
img.save("qrimg.png")