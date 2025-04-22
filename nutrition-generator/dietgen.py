from flask import Flask, render_template, request
import requests
from config import OPENROUTER_API_KEY, ORG_ID

app = Flask(__name__)

# === CONFIGURATION ===
# API key and org ID are now imported from config.py

# === OpenRouter Chat Function ===
def call_openrouter(prompt, model, system="You are a certified nutritionist."):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://diet-generator.com",
        "X-Title": "Diet Generator",
        "OpenAI-Organization": ORG_ID
    }

    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        print("Status Code:", response.status_code)
        print("Response Headers:", dict(response.headers))
        print("Response Body:", response.text)

        if response.status_code != 200:
            error_detail = response.json() if response.text else "No error details available"
            raise Exception(f"OpenRouter request failed with status {response.status_code}: {error_detail}")

        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"Error making request: {str(e)}")
        raise

# === ROUTES ===
@app.route('/')
def home():
    return render_template('diet.html')

@app.route('/generate-diet', methods=['POST'])
def generate_diet():
    # American height format: ft + in
    feet = int(request.form['height_feet'])
    inches = int(request.form['height_inches'])
    height_display = f"{feet}'{inches}\""

    user_input = {
        "age": request.form['age'],
        "weight": request.form['weight'],  # in lbs
        "height": height_display,          # formatted as 5'10"
        "gender": request.form['gender'],
        "activity": request.form['activity'],
        "goal": request.form['goal'],
        "preferences": request.form.get('preferences', ''),
        "allergies": request.form.get('allergies', '')
    }

    profile = "\n".join([f"{k.capitalize()}: {v}" for k, v in user_input.items()])

    # === Models ===
    model_a = "anthropic/claude-2"
    model_b = "anthropic/claude-2"

    # === ROUND 1: Initial Nutrition Plan ===
    prompt_a1 = f"""Here is the user's profile:\n{profile}\n
Create a nutrition breakdown with the following structure. Do NOT include any extra text:

Calories needed: ___ Calories  
Protein needed: ___ g  
Fat needed: ___ g  
Carbohydrates needed: ___ g  
Fiber needed: ___ g

Only respond using this format.
"""
    response_a1 = call_openrouter(prompt_a1, model=model_a)

    # === ROUND 2: Critique from Model B ===
    prompt_b1 = f"""This plan was created:\n{response_a1}\n\nCritique and suggest improvements using the same format only. No extra text."""
    response_b1 = call_openrouter(prompt_b1, model=model_b)

    # === ROUND 3: Final Revision ===
    prompt_a2 = f"""You created:\n{response_a1}\n\nIt was critiqued as:\n{response_b1}\n\nPlease revise the plan using only this format:

Calories needed: ___ Calories  
Protein needed: ___ g  
Fat needed: ___ g  
Carbohydrates needed: ___ g  
Fiber needed: ___ g
"""
    final_nutrition_plan = call_openrouter(prompt_a2, model=model_a)

    # === FINAL: Structured Meal Plan ===
    meal_plan_prompt = f"""
Based on this nutrition breakdown:\n{final_nutrition_plan}\n
Create a daily meal plan with nutrition values in this exact format:

Breakfast:
- [Item name] – Calories: ___, Protein: ___g, Fat: ___g, Carbs: ___g, Fiber: ___g

Lunch:
- ...

Dinner:
- ...

Snacks:
- ...

Total for Breakfast: Calories: ___, Protein: ___g, Fat: ___g, Carbs: ___g, Fiber: ___g  
Total for Lunch: Calories: ___, Protein: ___g, Fat: ___g, Carbs: ___g, Fiber: ___g  
Total for Dinner: ...  
Total for Snacks: ...  

Total Daily Intake: Calories: ___, Protein: ___g, Fat: ___g, Carbs: ___g, Fiber: ___g

⛔️ Do NOT include full sentences, summaries, or extra intro. Use labels only.
"""
    final_meal_plan = call_openrouter(meal_plan_prompt, model=model_b)

    return render_template("dietResult.html", final_meal_plan=final_meal_plan)

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=5000)
    args = parser.parse_args()
    app.run(debug=True, port=args.port)
