const form = document.getElementById("predictionForm");
const result = document.getElementById("result");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const attendance = Number(document.getElementById("attendance").value);
    const studyHours = Number(document.getElementById("study_hours").value);
    const previousMark = Number(document.getElementById("previous_mark").value);
    const assignments = Number(document.getElementById("assignments").value);

    const studyScore = Math.min(studyHours * 10, 100);

    const score =
        attendance * 0.25 +
        studyScore * 0.20 +
        previousMark * 0.35 +
        assignments * 0.20;

    const finalScore = score.toFixed(2);

    let level;
    let message;

    if (score >= 80) {
        level = "Excellent 🌟";
        message = "Great performance! Keep maintaining your study routine.";
    } else if (score >= 60) {
        level = "Good 👍";
        message = "Good performance. Increase your study time to improve further.";
    } else if (score >= 40) {
        level = "Average 📚";
        message = "Improve your attendance and study hours.";
    } else {
        level = "Needs Improvement ⚠️";
        message = "Focus more on attendance, assignments and regular study.";
    }

    result.innerHTML = `
        <div class="result-icon">🎯</div>
        <h2>Hello ${name}!</h2>
        <div class="score">${finalScore}%</div>
        <div class="level">${level}</div>
        <p>Predicted Academic Performance</p>
        <div class="tip">💡 ${message}</div>
    `;
});