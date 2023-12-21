from flask import Flask, request, jsonify
from flask_cors import CORS
from main import NaiveBayesClassifier

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*", "methods": ["POST", "OPTIONS"], "headers": ["Content-Type"]}})

classifier = NaiveBayesClassifier()
validation_data = classifier.train_from_directory('emails.zip')
classifier.save_model()
classifier.evaluate_model(validation_data)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        content = data['content']
        result = classifier.predict(content)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # app.run(debug=True)
    app.run()

