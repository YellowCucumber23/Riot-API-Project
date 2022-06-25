import json
from flask import Flask
from getData import getChallengerData

app = Flask(__name__)

# Members API Route
@app.route("/api")
def data():
    try: 
        roles, wins = getChallengerData()
        dict = {
            "win": [],
            "lose" : []
        }
        for i in range(len(wins)):
            if wins[i] == True:
                dict['win'].append(roles[i])
            else:
                dict['lose'].append(roles[i])
        
        with open('data.json', 'w+') as f:
            json.dump(dict, f, indent = 2)
            
        with open('data.json','r') as f:
            json_string = json.load(f)
            return json_string
    except:
        with open('data.json','r') as f:
            json_string = json.load(f)
            return json_string

if __name__ == "__main__":
    app.run(debug = True)