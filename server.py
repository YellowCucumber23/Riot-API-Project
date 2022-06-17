import json
from flask import Flask
from getData import getChallengerData

app = Flask(__name__)

# Members API Route
@app.route("/")
def data():
    with open('data.json','r') as f:
        json_string = json.load(f)
        return json_string

if __name__ == "__main__":
    app.run(debug = True)