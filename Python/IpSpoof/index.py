import os
import shutil
import subprocess
import sys

from colorama import Fore, Style, init

# Initialize colorama
init(autoreset=True)

# Check if Tor is installed
tor_path = shutil.which("tor")
if tor_path:
    print(Fore.GREEN + "Tor is installed, proceeding to the next step...")
else:
    print(
        Fore.RED
        + "Tor is not installed. Please install it to proceed. Run:\n  apt install tor"
    )

# Check if Tor is running/working
try:
    subprocess.run(
        ["tor", "--version"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    print(Fore.GREEN + "Tor is installed and accessible.")
except FileNotFoundError:
    print(Fore.RED + "Tor is not installed, or something went wrong.")
except subprocess.CalledProcessError:
    print(
        Fore.YELLOW
        + "Tor is installed but may not be functioning correctly. Please check the installation."
    )

# Check for `tornet` module
try:
    import tornet

    print(Fore.GREEN + "tornet module is installed.")
except ImportError:
    print(Fore.RED + "tornet is not installed. Install it using:\n pip install tornet")
    # Ask the user if they want to download missing dependencies
    download_deps = input(
        Fore.CYAN + "Do you want to download missing dependencies? (y/n): "
    )
    if download_deps.lower() == "y":
        os.system(
            "sudo apt install tor && sudo apt install python3-pip && pip install tornet"
        )
    else:
        sys.exit()


# Display options with colors
print(Fore.BLUE + "All dependencies are satisfied. Running IpSpoof...")
print(Fore.MAGENTA + " 1. Change IP and Interval every $s times.")
print(Fore.MAGENTA + " 2. Change IP randomly only every $s seconds.")

# Get the user input for the desired mode
user_input = input(Fore.YELLOW + "Enter the number (1/2/3): ")
if user_input == "1":
    interval = input(Fore.CYAN + "Enter the interval (in seconds): ")
    ip_change = input(
        Fore.CYAN + "Enter the number of times you want to change the IP: "
    )
    os.system(f"sudo tornet --interval {interval} --count {ip_change}")
elif user_input == "2":
    interval = input(Fore.CYAN + "Enter the interval (in seconds): ")
    os.system(f"sudo tornet --interval {interval} --count 0")
else:
    print(Fore.RED + "Invalid input. Please enter 1, 2, or 3.")
