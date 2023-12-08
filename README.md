# NB Email Filter 📧🔍

![React badge](https://img.shields.io/badge/made%20with-React-orange?style=plastic&logo=react)
![Javascript](https://img.shields.io/badge/written%20in-grey?style=plastic&logo=javascript)
![Python](https://img.shields.io/badge/and-Python-blue?style=plastic&logo=python)
![AI Course](https://img.shields.io/badge/for%20AI%20Course-purple)
<br>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
> Group 9: Gulnara Huseynova, Ozioma Nenubari Okonicha, Zulfiyya Aliyeva

## Structure

```nb-email-filter
│
├── nb-model
│   ├── emails.zip
│   ├── emails
│   ├── AI_Project.ipynb
│   ├── api.py
│   ├── main.py
│   ├── nb_model.joblib
│   └── nb_model.json
│
└── react-app
    ├── public
    │   ├── css
    │   ├── fonts
    │   ├── img
    │   ├── js
    │   ├── index.html
    │   ├── nb_model.joblib
    │   └── nb_model.json
    │
    ├── src
    │   ├── components
    │   ├── data
    │   ├── pages
    │   ├── styles
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── reportWebVitals.js
    │   └── setupTests.js
    │
    ├── package.json
    └── README.md
```

## Machine Learning Model 🧠
Our email filter utilizes a Naive Bayes Classifier trained on a dataset of emails.


## React App 🌐
Our user-friendly React app helps users interact with the email filter.


## How to Use 🚀  

1. Clone the repository: `git clone https://github.com/Ozziekins/nb-email-filter.git`  
2. Install dependencies: `cd nb-email-filter`  

### Machine Learning Model:

3. Open one terminal and run `cd nb_model`.  
4. Run `python3 api.py` to train the model and runs the Flask API.  
5. Access predictions via the `/predict` endpoint.  

### React App:

6. Open another terminal and install dependencies with `npm install` in `nb-email-filter` directory.  
7. Run the app with `npm start`.  
8. Access the app at http://localhost:3000.  

### Python Notebook

9. Feel free to adjust parameters and experiment with the model in `AI_Project.ipynb`.  

## Contributing 🤝
We welcome contributions! If you'd like to enhance the email filter, please fork the repository and create a pull request.

## Acknowledgments 🙏
Special thanks to our AI Course instructor for providing the teachings that guided us with the development of this project.