import cv2
import os

def extract_frames(video_path, output_dir):
  """Extracts frames from a video and saves them to an output directory.

  Args:
    video_path: Path to the video file.
    output_dir: Path to the output directory.
  """

  # Create output directory if it doesn't exist
  if not os.path.exists(output_dir):
    os.makedirs(output_dir)

  # Open the video file
  cap = cv2.VideoCapture(video_path)

  # Check if video opened successfully
  if not cap.isOpened():
    print("Error opening video file")
    return

  # Frame counter
  frame_count = 0

  while True:
    # Read a frame
    ret, frame = cap.read()

    if not ret:
      break

    # Save frame as an image
    frame_path = os.path.join(output_dir, f"frame_{frame_count}.jpg")
    cv2.imwrite(frame_path, frame)
    frame_count += 1

  # Release the video capture object
  cap.release()
  cv2.destroyAllWindows()

# Example usage
video_path = "video.mp4"
output_dir = "output_frames"
extract_frames(video_path, output_dir)
