import moviepy.editor
from tkinter.filedialog import *

vid =  askopenfilename()
video = moviepy.editor.VideoFileClip(vid)


audioConverter =video.audio

audioConverter.write_audiofile("Extracted.mp3")

print("-----Converted------")
