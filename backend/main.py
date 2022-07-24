from flask import Flask
import os
from dotenv import load_dotenv
from crypto_blueprint import crypto_blueprint

app = Flask(__name__)

app.register_blueprint(crypto_blueprint)

if __name__ == "__main__":
    load_dotenv()
    if os.environ.get("ENV") == "dev":
        app.run("localhost", 5000, debug=True)
    else:
        pass
