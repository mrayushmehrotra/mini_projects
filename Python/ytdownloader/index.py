from pytube import YouTube

def Download(link):
    try:
        yt_obj = YouTube(link)
        yt_stream = yt_obj.streams.get_highest_resolution()
        
        if yt_stream:
            print("Downloading...")
            yt_stream.download()
            print("Download complete")
        else:
            print("No stream available for the given link.")
    except Exception as e: 
        print(f"Error: {e}")

link = input("Paste a link: ")
Download(link)
