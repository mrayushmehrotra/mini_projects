import qrcode

image = qrcode.make(90474538)

image.save("qrimage.png")
