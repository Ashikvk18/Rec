from flask import Flask, render_template, request
from workoutModel import generate_precise_workout_plan, df
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# Helper to ensure videos are embeddable

def convert_to_embed(url):
    if url and "watch?v=" in url:
        return url.replace("watch?v=", "embed/")
    return url

# YouTube video mapping
youtube_videos = {
    "Incline dumbbell press": "https://www.youtube.com/embed/8iPEnn-ltC8",
    "Incline cable crossovers": "https://www.youtube.com/embed/upNfXSPNtzo",
    "Incline dumbbell flyes": "https://www.youtube.com/embed/bDaIL_zKbGs",
    "Decline dumbbell press": "https://www.youtube.com/embed/0xRvl4Qv3ZY",
    "Decline cable crossovers": "https://www.youtube.com/embed/_l16kgu06Gs",
    "Decline dumbbell flyes": "https://www.youtube.com/embed/IMALXhhHRKM",
    "Chest flyes": "https://www.youtube.com/embed/eGjt4lk6g34",
    "Cable crossovers": "https://www.youtube.com/embed/taI4XduLpTk",
    "Dumbbell flyes": "https://www.youtube.com/embed/eozdVDA78K0",
    "Barbell rows": "https://www.youtube.com/embed/bm0_q9bR_HA",
    "Dumbbell rows": "https://www.youtube.com/embed/roCP6wCXPqo",
    "Hyperextensions": "https://www.youtube.com/embed/qtjJUWCnDyE",
    "Bent-over rows": "https://www.youtube.com/embed/bm0_q9bR_HA",
    "Bird dog": "https://www.youtube.com/embed/k2azbhhuKuM",
    "Seated cable rows": "https://www.youtube.com/embed/GZbfZ033f74",
    "Pull-ups": "https://www.youtube.com/embed/eGo4IYlbE5g",
    "Barbell curls": "https://www.youtube.com/embed/kwG2ipFRgfo",
    "Dumbbell curls": "https://www.youtube.com/embed/ykJmrZ5v0Oo",
    "Preacher curls": "https://www.youtube.com/embed/3mtXqrkbEfI",
    "Hammer curls": "https://www.youtube.com/embed/zC3nLlEvin4",
    "Concentration curls": "https://www.youtube.com/embed/VMbDQ8PZazY",
    "Close-grip bench press": "https://www.youtube.com/embed/UYJsFzqdgK4",
    "Overhead triceps extensions": "https://www.youtube.com/embed/-Vyt2QdsR7E",
    "Triceps pushdowns": "https://www.youtube.com/embed/2-LAMcpzODU",
    "Skull crushers": "https://www.youtube.com/embed/d_KZxkY_0cM",
    "Triceps dips": "https://www.youtube.com/embed/6kALZikXxLc",
    "Barbell squats": "https://www.youtube.com/embed/ultWZbUMPL8",
    "Leg press": "https://www.youtube.com/embed/IZxyjW7MPJQ",
    "Leg extensions": "https://www.youtube.com/embed/YyvSfVjQeL0",
    "Romanian deadlifts": "https://www.youtube.com/embed/2SHsk9AzdjA",
    "Leg curls": "https://www.youtube.com/embed/ELOCsoDSmrg",
    "Barbell hip thrusts": "https://www.youtube.com/embed/LM8XHLYJoYs",
    "Donkey kicks": "https://www.youtube.com/embed/EtSJ8rwm5M8",
    "Standing calf raises": "https://www.youtube.com/embed/-M4-G8p8fmc",
    "Seated calf raises": "https://www.youtube.com/embed/3ZRe_QpvRPg",
    "Dumbbell front raises": "https://www.youtube.com/embed/-t7fuZ0KhDA",
    "Military press": "https://www.youtube.com/embed/43GSKivZnw4",
    "Lateral raises": "https://www.youtube.com/embed/3VcKaXpzqRo",
    "Bent-over lateral raises": "https://www.youtube.com/embed/SWjzFaH9QXA",
    "Face pulls": "https://www.youtube.com/embed/eIq5CB9JfKE",
    "Crunches": "https://www.youtube.com/embed/Xyd_fa5zoEU",
    "Leg raises": "https://www.youtube.com/embed/JB2oyawG9KI",
    "Bicycle crunches": "https://www.youtube.com/embed/9FGilxCbdz8",
    "Russian twists": "https://www.youtube.com/embed/wkD8rjkodUI",
    "Hanging leg raises": "https://www.youtube.com/embed/RuIdJSVTKO4",
    "Plank": "https://www.youtube.com/embed/pSHjTRCQxIw",
    "Wrist curl": "https://www.youtube.com/embed/3VLTzIrnb5g",
    "Wrist extension": "https://www.youtube.com/embed/UcwgCTkVvIQ",
    "Plate pinch": "https://www.youtube.com/embed/jFTV3DQf3HE",
    "Towel pull-up": "https://www.youtube.com/embed/ji7KCyukYKQ",
    "Fat grip dumbbell curl": "https://www.youtube.com/embed/ykJmrZ5v0Oo",
    "Hammer curl": "https://www.youtube.com/embed/zC3nLlEvin4"
}

@app.route("/")
def index():
    return render_template("workout.html")

@app.route("/recommend", methods=["POST"])
def recommend():
    age = int(request.form["age"])
    body_part = request.form["body_part"]
    muscle_type = request.form.get("muscle_type")

    if muscle_type == "" or muscle_type is None:
        plan = generate_precise_workout_plan(body_part, age)
        detailed_plan = []
        for item in plan:
            workout_name = item.split("(")[0].strip()
            video = convert_to_embed(youtube_videos.get(workout_name))
            detailed_plan.append({"text": item, "video": video})

        return render_template("result.html", 
                               age=age, 
                               body_part=body_part, 
                               muscle_type="All", 
                               recommendation="Full plan", 
                               plan=detailed_plan)
    else:
        # Filter training data to match only the selected category
        filtered_df = df[(df['Body Part'].str.lower() == body_part.lower()) & 
                         (df['Type of Muscle'].str.lower() == muscle_type.lower())].copy()

        label_encoder = LabelEncoder()
        filtered_df['Workout_Label'] = label_encoder.fit_transform(filtered_df['Workout'])

        filtered_X = pd.get_dummies(filtered_df[['Body Part', 'Type of Muscle']], drop_first=False)
        filtered_X['Age'] = filtered_df['Age']
        filtered_y = filtered_df['Workout_Label']

        local_model = RandomForestClassifier(n_estimators=100, random_state=42)
        local_model.fit(filtered_X, filtered_y)

        input_df = pd.DataFrame([{
            "Body Part": body_part,
            "Type of Muscle": muscle_type,
            "Age": age
        }])
        input_encoded = pd.get_dummies(input_df, columns=["Body Part", "Type of Muscle"], drop_first=False)

        for col in filtered_X.columns:
            if col not in input_encoded.columns:
                input_encoded[col] = 0
        input_encoded = input_encoded[filtered_X.columns]

        prediction = local_model.predict(input_encoded)
        recommendation = label_encoder.inverse_transform(prediction)[0]
        prime_video = convert_to_embed(youtube_videos.get(recommendation))

        muscle_df = df[(df['Body Part'].str.lower() == body_part.lower()) &
                       (df['Type of Muscle'].str.lower() == muscle_type.lower())]

        alternatives = []
        for _, row in muscle_df.iterrows():
            workout_name = row['Workout']
            if workout_name == recommendation:
                continue  # skip the recommended one
            sets = row['Sets']
            reps = row['Reps per Set']
            text = f"{workout_name} ({muscle_type}) — {sets} sets x {reps} reps"
            video = youtube_videos.get(workout_name)
            alternatives.append({"text": text, "video": video})

        return render_template("result.html", 
                               age=age, 
                               body_part=body_part, 
                               muscle_type=muscle_type, 
                               recommendation=recommendation, 
                               prime_video=prime_video,
                               plan=alternatives)

if __name__ == "__main__":
    app.run(debug=True)
