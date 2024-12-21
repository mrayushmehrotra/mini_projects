import speech_recognition as sr
import pyautogui

# Function to recognize speech and return text
def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        try:
            audio = recognizer.listen(source)
            text = recognizer.recognize_google(audio)
            print(f"You said: {text}")
            return text
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand the speech.")
            return ""
        except sr.RequestError as e:
            print(f"Request error from Google Speech Recognition service: {e}")
            return ""

# Main function to type text in the currently focused input box
def main():
    while True:
        command = input("Press Enter to start listening or type 'exit' to quit: ").strip()
        if command.lower() == 'exit':
            break

        # Get the speech-to-text output
        text = recognize_speech()

        if text:
            # Type the recognized text at the current cursor position
            pyautogui.typewrite(text)

if __name__ == "__main__":
    main()
