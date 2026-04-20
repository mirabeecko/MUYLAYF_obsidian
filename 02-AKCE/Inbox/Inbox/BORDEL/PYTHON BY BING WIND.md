

# Import libraries
import requests
import geopy.distance

# Define API key and base URL for OpenWeatherMap
api_key = "your_api_key_here"
base_url = "http://api.openweathermap.org/data/2.5/weather?"

# Define your location in latitude and longitude
my_lat = 50.6404
my_lon = 13.8245

# Define the radius in kilometers
radius = 20

# Define the minimum wind speed in meters per second for kitesurfing
min_wind_speed = 5

# Define a function to get the weather data for a given location
def get_weather_data(lat, lon):
    # Construct the complete URL with parameters
    complete_url = base_url + "lat=" + str(lat) + "&lon=" + str(lon) + "&appid=" + api_key + "&units=metric"
    # Get the response from the API
    response = requests.get(complete_url)
    # Convert the response to JSON format
    data = response.json()
    # Return the data
    return data

# Define a function to calculate the distance between two locations in kilometers
def get_distance(lat1, lon1, lat2, lon2):
    # Create geopy objects for the locations
    loc1 = (lat1, lon1)
    loc2 = (lat2, lon2)
    # Calculate the distance using geopy.distance.distance method
    distance = geopy.distance.distance(loc1, loc2).km
    # Return the distance
    return distance

# Define a list to store the locations and their weather data
locations = []

# Loop through the latitude and longitude values within the radius
for lat in range(int(my_lat - radius / 111), int(my_lat + radius / 111) + 1):
    for lon in range(int(my_lon - radius / 111), int(my_lon + radius / 111) + 1):
        # Check if the location is within the radius using the get_distance function
        if get_distance(my_lat, my_lon, lat, lon) <= radius:
            # Get the weather data for the location using the get_weather_data function
            data = get_weather_data(lat, lon)
            # Check if the data is valid (status code 200)
            if data["cod"] == 200:
                # Extract the name, wind speed and wind direction from the data
                name = data["name"]
                wind_speed = data["wind"]["speed"]
                wind_deg = data["wind"]["deg"]
                # Append the location and its weather data to the locations list as a tuple
                locations.append((name, wind_speed, wind_deg))

# Sort the locations list by wind speed in descending order
locations.sort(key=lambda x: x[1], reverse=True)

# Print a message with your location and radius
print(f"Místa s nejlepšími povětrnostními podmínkami pro kitesurfing pro danou chvíli v okruhu {radius} km ode mě Teplice jsou:")

# Print the first five locations with their wind speed and direction
for i in range(5):
    # Check if there are enough locations in the list
    if i < len(locations):
        # Unpack the location tuple
        name, wind_speed, wind_deg = locations[i]
        # Print the location name, wind speed and wind direction
        print(f"{i+1}. {name}: rychlost větru {wind_speed} m/s, směr větru {wind_deg} stupňů")

#claude_reference
