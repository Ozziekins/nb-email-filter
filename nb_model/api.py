from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*", "methods": ["POST", "OPTIONS"], "headers": ["Content-Type"]}})

model_path = './nb_model.joblib'
model = joblib.load(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        content = data['content']
        prediction = model.predict(content)
        print("Prediction: ", prediction)
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
