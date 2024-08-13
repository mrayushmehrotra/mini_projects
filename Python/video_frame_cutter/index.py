from tkinter import * 
import cv2
import os
from tkinter.filedialog import askopenfilename

def extract_frames(video_path):
    """Extracts frames from a video and saves them in the same directory as the video."""
    # Get the directory of the video file
    output_dir = os.path.dirname(video_path)

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error opening video file")
        return

    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_name = f"frame_{frame_count}.jpg"
        frame_path = os.path.join(output_dir, frame_name)
        cv2.imwrite(frame_path, frame)
        frame_count += 1

    cap.release()
    cv2.destroyAllWindows()

def select_video():
    video_path = askopenfilename(
        title="Select Video File",
        filetypes=[("Video Files", "*.mp4 *.avi *.mov *.mkv")]
    )
    
    if video_path:
        selected_video_path.set(video_path)
        print(f"Selected video: {video_path}")
        extract_frames(video_path)
        success_message.set(f"Frames cut successfully in {os.path.dirname(video_path)}!")

root = Tk() 
root.title("Frame Cutter") 
root.config(bg="black")

selected_video_path = StringVar()
success_message = StringVar()

left_frame = Frame(root, bg="#111111", width=1080, height=820)
left_frame.grid(row=0, column=0, padx=10, pady=5)

Button(root, text="Select Video", bg='white', command=select_video, height=3, width=13, bd=6).place(x=440, y=320)

Label(root, textvariable=selected_video_path, bg="black", fg="white").place(x=240, y=370)
Label(root, textvariable=success_message, bg="black", fg="green").place(x=240, y=400)

root.mainloop()
