 # importing the module 
import pywhatkit
    # using Exception Handling to avoid
    # unprecedented errors
number = input("Enter Your Number With Country Code e.g. +91: ")
print('This will send Message to Your Desired Number Within 24 hours if the script Run')
try:
            # sending message to receiver
            # using pywhatkit
     pywhatkit.sendwhatmsg(number,"hey how are you",0,0)
     print("Successfully Sent!")
except Exception as e:
    print(f"An error occurred: {e}")
                # handling exception
            # and printing error message
 
