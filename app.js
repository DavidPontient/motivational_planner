const quoteEl = document.getElementById("quote");
const newQuoteBtn = document.getElementById("newQuote");

async function getQuote() {
    try {
        const res = await fetch("https://api.adviceslip.com/advice"); // working API
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        quoteEl.textContent = `"${data.slip.advice}"`;
    } catch (err) {
        fetch("data/quotes.json")
            .then(res => res.json())
            .then(localQuotes => {
                const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
                quoteEl.textContent = `"${random.text}" — ${random.author}`;
            })
            .catch(() => {
                quoteEl.textContent = "Unable to load quotes 😔";
            });
    }
}

newQuoteBtn.addEventListener("click", getQuote);
getQuote();

// Planner
const subjectInput = document.getElementById("subjectInput");
const addSubjectBtn = document.getElementById("addSubject");
const subjectList = document.getElementById("subjectList");
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

function renderSubjects() {
    subjectList.innerHTML = "";
    subjects.forEach((sub, i) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `${sub} <button class="delete-btn" onclick="removeSubject(${i})">Delete</button>`;
        subjectList.appendChild(div);
    });
}

function removeSubject(index) {
    subjects.splice(index, 1);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    renderSubjects();
}

addSubjectBtn.addEventListener("click", () => {
    if (subjectInput.value.trim() !== "") {
        subjects.push(subjectInput.value.trim());
        localStorage.setItem("subjects", JSON.stringify(subjects));
        subjectInput.value = "";
        renderSubjects();
    }
});

renderSubjects();

// Sessions
const sessionInput = document.getElementById("sessionInput");
const sessionDate = document.getElementById("sessionDate");
const sessionStart = document.getElementById("sessionStart");
const sessionEnd = document.getElementById("sessionEnd");
const addSessionBtn = document.getElementById("addSession");
const sessionList = document.getElementById("sessionList");

let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

function renderSessions() {
    sessionList.innerHTML = "";
    sessions.forEach((sess, i) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<strong>${sess.desc}</strong><br>📅 ${sess.date} | ⏰ ${sess.start} - ${sess.end} <button class="delete-btn" onclick="removeSession(${i})">Delete</button>`;
        sessionList.appendChild(div);
    });
}

function removeSession(index) {
    sessions.splice(index, 1);
    localStorage.setItem("sessions", JSON.stringify(sessions));
    renderSessions();
}

addSessionBtn.addEventListener("click", () => {
    if (sessionInput.value.trim() && sessionDate.value && sessionStart.value && sessionEnd.value) {
        sessions.push({
            desc: sessionInput.value.trim(),
            date: sessionDate.value,
            start: sessionStart.value,
            end: sessionEnd.value
        });
        localStorage.setItem("sessions", JSON.stringify(sessions));
        sessionInput.value = "";
        sessionDate.value = "";
        sessionStart.value = "";
        sessionEnd.value = "";
        renderSessions();
    }
});

renderSessions();

// Notes
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNote");
const noteStatus = document.getElementById("noteStatus");

saveNoteBtn.addEventListener("click", () => {
    localStorage.setItem("note", noteInput.value.trim());
    noteStatus.textContent = "Note saved!";
    setTimeout(() => (noteStatus.textContent = ""), 2000);
});

noteInput.value = localStorage.getItem("note") || "";
