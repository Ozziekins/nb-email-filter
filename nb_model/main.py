import os
import re
import math
import random
import json
import zipfile
import joblib
from collections import defaultdict
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*", "methods": ["POST", "OPTIONS"], "headers": ["Content-Type"]}})

class NaiveBayesClassifier:
    def __init__(self):
        self.spam_prob = 0
        self.ham_prob = 0
        self.spam_word_probs = defaultdict(float)
        self.ham_word_probs = defaultdict(float)
        self.vocab = set()

    def save_model(self, file_path='nb_model.joblib'):
        joblib.dump(self, file_path)

    def load_model(self, file_path='nb_model.joblib'):
        loaded_classifier = joblib.load(file_path)
        self.__dict__.update(loaded_classifier.__dict__)

    def preprocess_text(self, text):
        # Simple text preprocessing: lowercase and remove non-alphabetic characters
        text = text.lower()
        text = re.sub(r'[^a-zA-Z ]', '', text)
        return text

    def train(self, training_data):
        spam_count = ham_count = 0
        spam_word_counts = defaultdict(int)
        ham_word_counts = defaultdict(int)

        for text, label in training_data:
            text = self.preprocess_text(text)
            words = text.split()
            for word in words:
                if label == 'spam':
                    spam_word_counts[word] += 1
                else:
                    ham_word_counts[word] += 1
                self.vocab.add(word)

            if label == 'spam':
                spam_count += 1
            else:
                ham_count += 1

        total_emails = spam_count + ham_count
        self.spam_prob = spam_count / total_emails
        self.ham_prob = ham_count / total_emails

        for word in self.vocab:
            # Laplace smoothing to handle unseen words
            self.spam_word_probs[word] = (spam_word_counts[word] + 1) / (spam_count + 2)
            self.ham_word_probs[word] = (ham_word_counts[word] + 1) / (ham_count + 2)

    def predict(self, text):
        text = self.preprocess_text(text)
        words = text.split()

        spam_score = math.log(self.spam_prob)
        ham_score = math.log(self.ham_prob)

        for word in words:
            if word in self.vocab:
                spam_score += math.log(self.spam_word_probs[word])
                ham_score += math.log(self.ham_word_probs[word])

        confidence = abs(spam_score - ham_score)

        # Classify as spam if the spam_score is greater
        predicted_class = 'spam' if spam_score > ham_score else 'ham'

        return {'prediction': predicted_class, 'confidence': confidence}


    def train_from_directory(self, zip_file_path):
        with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
            zip_ref.extractall('./')

        directory = './emails'

        ham_folder = os.path.join(directory, 'ham')
        spam_folder = os.path.join(directory, 'spam')

        ham_emails = [(self.read_email(os.path.join(ham_folder, f)), 'ham') for f in os.listdir(ham_folder)]
        spam_emails = [(self.read_email(os.path.join(spam_folder, f)), 'spam') for f in os.listdir(spam_folder)]

        # Split emails into training, validation, and test sets
        random.shuffle(ham_emails)
        random.shuffle(spam_emails)

        ham_train_size = int(0.8 * len(ham_emails))
        spam_train_size = int(0.8 * len(spam_emails))

        training_data = ham_emails[:ham_train_size] + spam_emails[:spam_train_size]
        validation_data = ham_emails[ham_train_size:] + spam_emails[spam_train_size:]

        # Update the vocab based on the new data
        self.train(training_data)

        # Save the model to a JSON file
        model_data = {
            'spam_prob': self.spam_prob,
            'ham_prob': self.ham_prob,
            'spam_word_probs': dict(self.spam_word_probs),
            'ham_word_probs': dict(self.ham_word_probs),
            'vocab': list(self.vocab)
        }

        with open('nb_model_dir.json', 'w') as json_file:
            json.dump(model_data, json_file)

        return validation_data

    def train_from_csv(self, csv_file_path):
        df = pd.read_csv(csv_file_path)
        df['Body'] = df['Body'].astype(str)
        df['Label'] = df['Label'].astype(int).map({1: 'spam', 0: 'ham'})

        # Split the dataset into training and validation sets
        train_df, validation_df = train_test_split(df, test_size=0.2, random_state=42)

        training_data = list(zip(train_df['Body'], train_df['Label']))
        validation_data = list(zip(validation_df['Body'], validation_df['Label']))

        # Update the vocab based on the new data
        self.train(training_data)

        # Save the model to a JSON file
        model_data = {
            'spam_prob': self.spam_prob,
            'ham_prob': self.ham_prob,
            'spam_word_probs': dict(self.spam_word_probs),
            'ham_word_probs': dict(self.ham_word_probs),
            'vocab': list(self.vocab)
        }

        with open('nb_model_csv.json', 'w') as json_file:
            json.dump(model_data, json_file)

        return validation_data

    def evaluate_model(self, validation_data):
        test_texts, true_labels = zip(*validation_data)
        results = [self.predict(text) for text in test_texts]
        predicted_labels = [result['prediction'] for result in results]

        # Calculate metrics
        accuracy = accuracy_score(true_labels, predicted_labels)
        precision = precision_score(true_labels, predicted_labels, pos_label='spam')
        recall = recall_score(true_labels, predicted_labels, pos_label='spam')
        f1 = f1_score(true_labels, predicted_labels, pos_label='spam')

        print(f"Accuracy: {accuracy:.2f}")
        print(f"Precision: {precision:.2f}")
        print(f"Recall: {recall:.2f}")
        print(f"F1 Score: {f1:.2f}")

        return accuracy, precision, recall, f1

    def read_email(self, file_path):
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
            return file.read()

    def plot_most_common_words(self, class_label, num_words=10, min_word_length=4):
        if class_label == 'spam':
            word_probs = self.spam_word_probs
        elif class_label == 'ham':
            word_probs = self.ham_word_probs
        else:
            raise ValueError("Invalid class label. Use 'spam' or 'ham'.")

        filtered_words = [word for word in word_probs if len(word) > min_word_length]

        # Sort filtered words by probability
        sorted_words = sorted(filtered_words, key=word_probs.get, reverse=True)[:num_words]
        probabilities = [word_probs[word] for word in sorted_words]

        plt.figure(figsize=(10, 6))
        sns.barplot(x=probabilities, y=sorted_words, palette='viridis')
        plt.title(f"Top {num_words} Words for {class_label.capitalize()}")
        plt.xlabel("Probability")
        plt.ylabel("Word")
        plt.show()
