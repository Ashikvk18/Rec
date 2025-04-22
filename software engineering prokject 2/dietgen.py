from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# === CONFIGURATION ===
OPENROUTER_API_KEY = "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"  # Replace with your real key from https://openrouter.ai/keys

# === OpenRouter Chat Function ===
def call_openrouter(prompt, model, system="You are a certified nutritionist."):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "Diet Generator Debate"
    }

    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)

    if response.status_code != 200:
        print("❌ Error Code:", response.status_code)
        try:
            print("❌ Error Details:", response.json())
        except Exception:
            print("❌ Raw Response:", response.text)
        raise Exception("OpenRouter request failed.")

    return response.json()['choices'][0]['message']['content']

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
    model_a = "mistralai/mistral-7b-instruct"
    model_b = "meta-llama/llama-3-8b-instruct"

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
    app.run(debug=True)
