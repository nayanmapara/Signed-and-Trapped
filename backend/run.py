from app import create_app
import os
from flask_cors import CORS

app = create_app()
CORS(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
    # app.run(debug=True)