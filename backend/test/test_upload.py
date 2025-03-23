import requests

url = "https://signed-and-trapped-137513138469.us-central1.run.app/upload"
file_path = "yourfile.pdf"  # Change this

with open(file_path, "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)

print(response.json())  # Prints the extracted text & analysis
