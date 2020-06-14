from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
import pandas as pd
import simplejson as json

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route("/")
def index():

    # Return template and data
    return render_template("index.html")
    
@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

if __name__ == "__main__":
    app.run(debug=True)