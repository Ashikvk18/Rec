function calculateCalories() {
    // Get input values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    
    // Validate inputs
    if (!age || !weight || !height || age <= 0 || weight <= 0 || height <= 0) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Calculate total daily calories
    const totalCalories = Math.round(bmr * activity);

    // Calculate recommended macros
    const protein = Math.round(weight * 2.2); // 1g per lb of body weight
    const fat = Math.round((totalCalories * 0.25) / 9); // 25% of calories from fat
    const carbs = Math.round((totalCalories - (protein * 4) - (fat * 9)) / 4); // Remaining calories from carbs

    // Display results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Your Daily Calorie Needs:</h3>
        <p><strong>${totalCalories}</strong> calories/day to maintain weight</p>
        <p><strong>${totalCalories - 500}</strong> calories/day to lose 1 lb/week</p>
        <p><strong>${totalCalories + 500}</strong> calories/day to gain 1 lb/week</p>
        <h3>Recommended Macros:</h3>
        <p>Protein: <strong>${protein}g</strong></p>
        <p>Fat: <strong>${fat}g</strong></p>
        <p>Carbs: <strong>${carbs}g</strong></p>
    `;
    resultDiv.style.display = 'block';
}
