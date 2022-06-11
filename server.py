from flask import Flask

app = Flask(__name__)

# Members API Route
@app.route("/")
def data():
    return {"members": ["Member1", "Member2", "Member2"]}

if __name__ == "__main__":
    app.run(debug = True)