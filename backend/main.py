from flask import Flask, render_template
import os
from dotenv import load_dotenv
from crypto_blueprint import crypto_blueprint

app = Flask(__name__, static_folder='build/static', template_folder='build')

app.register_blueprint(crypto_blueprint)

# Default route to serve the React build file from build/index.html.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>', methods=['GET'])
def serve(path):
    return render_template('index.html')

if __name__ == "__main__":
    load_dotenv()
    if os.environ.get("ENV") == "dev":
        app.run("localhost", 5000, debug=True)
    else:
        pass
