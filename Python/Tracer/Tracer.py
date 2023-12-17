import phonenumbers

from phonenumbers import timezone, geocoder, carrier

print("Give Your Number With the Country Code, e.g. If User is in India input will be like: +91xxxxx\n ")

myNum = "+919701818203"
number = myNum

phone = phonenumbers.parse(number)

# Get the time zones for the phone number.
time_zones = timezone.time_zones_for_number(phone)

# Get the carrier name for the phone number.
carrier_name = carrier.name_for_number(phone, "en")

# Get the region for the phone number.
region = geocoder.description_for_number(phone, lang="en")

# Print the time zones, phone number, carrier name, region, and geo information.

print(f"Time zones: {time_zones}")
print(f"Phone number: {phone}")
print(f"Carrier name: {carrier_name}")
print(f"Region: {region}")
