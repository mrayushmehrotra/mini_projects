import http.client
import json
import random
import string
from tqdm import tqdm
import requests
import os

# Function to generate a random string for the file name
def generate_random_string(length=8):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

# Create the HTTPS connection
conn = http.client.HTTPSConnection("all-video-downloader1.p.rapidapi.com")

# URL of the Instagram reel to download
url = input("Enter the url: ")

# Create the payload with the URL as a string
payload = json.dumps({"url": url})

# Define the headers
headers = {
    'x-rapidapi-key': "94e4390530msh1aba0690f7c7d8cp100edejsnab1459cfcd45",
    'x-rapidapi-host': "all-video-downloader1.p.rapidapi.com",
    'Content-Type': "application/json"
}

# Make the POST request
conn.request("POST", "/Instagram", payload, headers)

# Get the response
res = conn.getresponse()
data = res.read()
raw_data = json.loads(data.decode("utf-8"))

# Check if the response contains the expected data
if "data" in raw_data and len(raw_data["data"]) > 0 and "url" in raw_data["data"][0]:
    d_link = raw_data["data"][0]["url"]

    # Make a GET request to download the video
    response = requests.get(d_link, stream=True)

    # Generate a random file name
    file_name = generate_random_string() + ".mp4"
    
    # Ensure the file name is valid
    file_name = os.path.basename(file_name)

    with open(file_name, "wb") as handle:
        for data in tqdm(response.iter_content(chunk_size=8192)):
            handle.write(data)
    
    print(f"Video downloaded successfully as {file_name}")
else:
    print("Failed to retrieve the video download link.")
