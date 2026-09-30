// ==============================
// DIGITAL CLOCK
// ==============================

const clock = document.getElementById("clock");

const date = document.getElementById("date");


function updateClock() {

    const now = new Date();


    // Get time

    let hours = now.getHours();

    let minutes = now.getMinutes();

    let seconds = now.getSeconds();


    // Convert to 12 hour format

    hours = hours % 12;

    if (hours === 0) {
        hours = 12;
    }


    // Add zero

    hours = String(hours).padStart(2, "0");

    minutes = String(minutes).padStart(2, "0");

    seconds = String(seconds).padStart(2, "0");


    // Display time

    clock.textContent =
        hours + ":" +
        minutes + ":" +
        seconds;


    // Display date

    date.textContent =
        now.toLocaleDateString("en-IN", {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric"

        });
}


updateClock();

setInterval(updateClock, 1000);



// ==============================
// STOPWATCH
// ==============================

let startTime = 0;

let elapsedTime = 0;

let timer = null;

let lapNumber = 0;


// Get stopwatch elements

const stopwatch =
    document.getElementById("stopwatch");

const laps =
    document.getElementById("laps");

const lapCount =
    document.getElementById("lapCount");


// ==============================
// FORMAT TIME
// ==============================

function formatTime(milliseconds) {

    const hours =
        Math.floor(milliseconds / 3600000);


    const minutes =
        Math.floor(
            (milliseconds % 3600000) / 60000
        );


    const seconds =
        Math.floor(
            (milliseconds % 60000) / 1000
        );


    const ms =
        milliseconds % 1000;


    return (

        String(hours).padStart(2, "0")
        + ":" +

        String(minutes).padStart(2, "0")
        + ":" +

        String(seconds).padStart(2, "0")
        + ":" +

        String(ms).padStart(3, "0")

    );
}


// ==============================
// UPDATE STOPWATCH
// ==============================

function updateStopwatch() {

    elapsedTime =
        performance.now() - startTime;


    stopwatch.textContent =
        formatTime(
            Math.floor(elapsedTime)
        );
}


// ==============================
// START
// ==============================

function startStopwatch() {

    if (timer !== null) {

        return;
    }


    startTime =
        performance.now() - elapsedTime;


    timer =
        setInterval(
            updateStopwatch,
            10
        );
}


// ==============================
// PAUSE
// ==============================

function pauseStopwatch() {

    if (timer === null) {

        return;
    }


    clearInterval(timer);

    timer = null;

    updateStopwatch();
}


// ==============================
// RESET
// ==============================

function resetStopwatch() {

    clearInterval(timer);

    timer = null;

    elapsedTime = 0;

    lapNumber = 0;


    stopwatch.textContent =
        "00:00:00:000";


    lapCount.textContent =
        "0 laps";


    laps.innerHTML = `

        <li class="empty">

            Start the stopwatch and press
            <b>Lap</b> to record a time.

        </li>

    `;
}


// ==============================
// LAP
// ==============================

function lapTime() {

    if (timer === null) {

        return;
    }


    lapNumber++;


    // Remove empty message

    const empty =
        document.querySelector(".empty");


    if (empty) {

        empty.remove();

    }


    // Create lap

    const li =
        document.createElement("li");


    li.innerHTML = `

        <span>
            Lap ${lapNumber}
        </span>

        <span>
            ${formatTime(
                Math.floor(elapsedTime)
            )}
        </span>

    `;


    // Add newest lap at top

    laps.prepend(li);


    // Update count

    lapCount.textContent =
        lapNumber +
        (lapNumber === 1
            ? " lap"
            : " laps");
}