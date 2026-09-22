from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/<path:filename>")
def files(filename):
    return send_from_directory(".", filename)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    attendance = float(data["attendance"])
    study_hours = float(data["study_hours"])
    previous_mark = float(data["previous_mark"])
    assignments = float(data["assignments"])

    # Simple student performance prediction
    study_score = min(study_hours * 10, 100)

    prediction = (
        attendance * 0.25
        + study_score * 0.20
        + previous_mark * 0.35
        + assignments * 0.20
    )

    prediction = round(prediction, 2)

    if prediction >= 80:
        level = "Excellent"
        message = "Great performance! Keep maintaining your study routine."
    elif prediction >= 60:
        level = "Good"
        message = "Good performance. Increase your study time to improve further."
    elif prediction >= 40:
        level = "Average"
        message = "You can improve by increasing attendance and study hours."
    else:
        level = "Needs Improvement"
        message = "Focus more on attendance, assignments and regular study."

    return jsonify({
        "score": prediction,
        "level": level,
        "message": message
    })


if __name__ == "__main__":
    app.run(debug=True)