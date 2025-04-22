import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# STEP 1: Load the dataset (already has Age and Age Group)
df = pd.read_csv("D:/Software Engineering project/Workout_Dataset_with_Age.csv")  # Adjust path if needed

# STEP 2: Encode target workout labels for ML model
df_cleaned = df.dropna()
le = LabelEncoder()
df_cleaned['Workout_Label'] = le.fit_transform(df_cleaned['Workout'])

# STEP 3: One-hot encode features + keep Age
categorical_features = ['Body Part', 'Type of Muscle']
df_encoded = pd.get_dummies(df_cleaned[categorical_features], drop_first=True)
df_encoded['Age'] = df_cleaned['Age']

X = df_encoded
y = df_cleaned['Workout_Label']

# STEP 4: Train the model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
X_columns = X.columns

# STEP 5: ML-based workout recommendation
def recommend_workout(age, body_part, muscle_type):
    input_df = pd.DataFrame([{
        'Age': age,
        'Body Part': body_part,
        'Type of Muscle': muscle_type
    }])
    input_encoded = pd.get_dummies(input_df, columns=['Body Part', 'Type of Muscle'], drop_first=True)

    for col in X_columns:
        if col not in input_encoded.columns:
            input_encoded[col] = 0
    input_encoded = input_encoded[X_columns]

    prediction = model.predict(input_encoded)
    return le.inverse_transform(prediction)[0]

# STEP 6: Improved plan generation (age group + closest age)
def generate_precise_workout_plan(body_part, age):
    # Determine user's age group
    if 18 <= age <= 30:
        user_group = '18-30'
    elif 31 <= age <= 50:
        user_group = '31-50'
    else:
        user_group = '51+'

    # Filter by body part
    plan_df = df[df['Body Part'].str.lower() == body_part.lower()]
    if plan_df.empty:
        return [f"No workouts found for {body_part}"]

    workout_plan = []

    for muscle in plan_df['Type of Muscle'].unique():
        muscle_df = plan_df[plan_df['Type of Muscle'] == muscle]

        # First try matching Age Group
        age_group_df = muscle_df[muscle_df['Age Group'] == user_group]

        if not age_group_df.empty:
            age_group_df = age_group_df.copy()
            age_group_df['Age_Diff'] = abs(age_group_df['Age'] - age)
            best_match = age_group_df.loc[age_group_df['Age_Diff'].idxmin()]
        else:
            # Fallback to any age
            muscle_df = muscle_df.copy()
            muscle_df['Age_Diff'] = abs(muscle_df['Age'] - age)
            best_match = muscle_df.loc[muscle_df['Age_Diff'].idxmin()]

        workout_plan.append(
            f"{best_match['Workout']} ({best_match['Type of Muscle']}) — {best_match['Sets']} sets x {best_match['Reps per Set']} reps"
        )

    return workout_plan
