// --- QUOTES LOGIC ---
const quoteEl = document.getElementById("quote");
const newQuoteBtn = document.getElementById("newQuote");

async function getQuote() {
    try {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        quoteEl.textContent = `"${data.content}" — ${data.author}`;
    } catch {
        fetch("data/quotes.json")
            .then(res => res.json())
            .then(localQuotes => {
                const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
                quoteEl.textContent = `"${random.text}" — ${random.author}`;
            });
    }
}

newQuoteBtn.addEventListener("click", getQuote);
getQuote();

// --- PLANNER LOGIC ---
const subjectInput = document.getElementById("subjectInput");
const addSubjectBtn = document.getElementById("addSubject");
const subjectList = document.getElementById("subjectList");

function loadSubjects() {
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjectList.innerHTML = "";
    subjects.forEach((subject, i) => {
        const li = document.createElement("li");
        li.textContent = subject;
        li.onclick = () => removeSubject(i);
        subjectList.appendChild(li);
    });
}

function addSubject() {
    const val = subjectInput.value.trim();
    if (val) {
        const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
        subjects.push(val);
        localStorage.setItem("subjects", JSON.stringify(subjects));
        subjectInput.value = "";
        loadSubjects();
    }
}

function removeSubject(i) {
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjects.splice(i, 1);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    loadSubjects();
}

addSubjectBtn.addEventListener("click", addSubject);
loadSubjects();

// --- SESSIONS LOGIC ---
const sessionInput = document.getElementById("sessionInput");
const addSessionBtn = document.getElementById("addSession");
const sessionList = document.getElementById("sessionList");

function loadSessions() {
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    sessionList.innerHTML = "";
    sessions.forEach((s, i) => {
        const li = document.createElement("li");
        li.textContent = s;
        li.onclick = () => removeSession(i);
        sessionList.appendChild(li);
    });
}

function addSession() {
    const val = sessionInput.value.trim();
    if (val) {
        const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
        sessions.push(val);
        localStorage.setItem("sessions", JSON.stringify(sessions));
        sessionInput.value = "";
        loadSessions();
    }
}

function removeSession(i) {
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    sessions.splice(i, 1);
    localStorage.setItem("sessions", JSON.stringify(sessions));
    loadSessions();
}

addSessionBtn.addEventListener("click", addSession);
loadSessions();

// --- NOTES LOGIC ---
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNote");
const noteStatus = document.getElementById("noteStatus");

function saveNote() {
    const note = noteInput.value.trim();
    localStorage.setItem("note", note);
    noteStatus.textContent = "Note saved!";
    setTimeout(() => (noteStatus.textContent = ""), 2000);
}

function loadNote() {
    const saved = localStorage.getItem("note");
    if (saved) noteInput.value = saved;
}

saveNoteBtn.addEventListener("click", saveNote);
loadNote();
