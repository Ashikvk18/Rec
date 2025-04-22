# Recreation Center Website

This website includes various features for the recreation center, including a workout generator and a nutrition generator.

## Features

- Health Calculators (BMI, BMR, Calorie)
- Workout Generator
- Nutrition Generator
- Exercise Videos
- Comments and Suggestions

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Ashikvk18/Rec.git
cd Rec
```

2. Set up the workout generator:
```bash
cd workout-generator
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the nutrition generator:
```bash
cd ../nutrition-generator
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```


5. Start the servers:

For the workout generator (Terminal 1):
```bash
cd workout-generator
.\venv\Scripts\activate
python app.py
```

For the nutrition generator (Terminal 2):
```bash
cd nutrition-generator
.\venv\Scripts\activate
python dietgen.py --port 5001
```

6. Open the website:
- Open `index.html` in your browser
- The workout generator will be available at http://127.0.0.1:5000
- The nutrition generator will be available at http://127.0.0.1:5001

## Security Note

Never commit API keys or sensitive information to the repository. Always use environment variables for sensitive data.
