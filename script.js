const form = document.getElementById("predictionForm");
const result = document.getElementById("result");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const attendance = document.getElementById("attendance").value;
    const study_hours = document.getElementById("study_hours").value;
    const previous_mark = document.getElementById("previous_mark").value;
    const assignments = document.getElementById("assignments").value;


    result.innerHTML = `
        <div class="result-icon">⏳</div>
        <h2>Analyzing...</h2>
        <p>Please wait while we calculate your prediction.</p>
    `;


    try {

        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                attendance: attendance,

                study_hours: study_hours,

                previous_mark: previous_mark,

                assignments: assignments

            })

        });


        const data = await response.json();


        result.innerHTML = `

            <div class="result-icon">🎯</div>

            <h2>Hello ${name}!</h2>

            <div class="score">
                ${data.score}%
            </div>

            <div class="level">
                ${data.level}
            </div>

            <p>
                Predicted Academic Performance
            </p>

            <div class="tip">
                💡 ${data.message}
            </div>

        `;

    }

    catch (error) {

        result.innerHTML = `

            <div class="result-icon">❌</div>

            <h2>Error</h2>

            <p>
                Unable to connect to Python server.
            </p>

        `;

        console.error(error);
    }

});