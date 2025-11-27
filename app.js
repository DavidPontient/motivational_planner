const quoteEl = document.getElementById("quote");
const newQuoteBtn = document.getElementById("newQuote");

async function fetchQuote() {
  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    quoteEl.textContent = `"${data.content}" — ${data.author}`;
  } catch {
    quoteEl.textContent = "Unable to load quotes 😔";
  }
}
newQuoteBtn.addEventListener("click", fetchQuote);
fetchQuote();

// Planner
const subjectInput = document.getElementById("subjectInput");
const addSubjectBtn = document.getElementById("addSubject");
const subjectList = document.getElementById("subjectList");

async function loadSubjects() {
  const res = await fetch("/api/subjects");
  const subjects = await res.json();
  subjectList.innerHTML = "";
  subjects.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s.name;
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = async () => {
      await fetch(`/api/subjects/${s.id}`, { method: "DELETE" });
      loadSubjects();
    };
    li.appendChild(btn);
    subjectList.appendChild(li);
  });
}
addSubjectBtn.onclick = async () => {
  if (subjectInput.value.trim()) {
    await fetch("/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: subjectInput.value })
    });
    subjectInput.value = "";
    loadSubjects();
  }
};
loadSubjects();

// Sessions
const sessionInput = document.getElementById("sessionInput");
const sessionDate = document.getElementById("sessionDate");
const addSessionBtn = document.getElementById("addSession");
const sessionList = document.getElementById("sessionList");

async function loadSessions() {
  const res = await fetch("/api/sessions");
  const sessions = await res.json();
  sessionList.innerHTML = "";
  sessions.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.description} — ${s.date}`;
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = async () => {
      await fetch(`/api/sessions/${s.id}`, { method: "DELETE" });
      loadSessions();
    };
    li.appendChild(btn);
    sessionList.appendChild(li);
  });
}
addSessionBtn.onclick = async () => {
  if (sessionInput.value.trim() && sessionDate.value) {
    await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: sessionInput.value, date: sessionDate.value })
    });
    sessionInput.value = "";
    sessionDate.value = "";
    loadSessions();
  }
};
loadSessions();

// Notes
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNote");
const notesList = document.getElementById("notesList");

async function loadNotes() {
  const res = await fetch("/api/notes");
  const notes = await res.json();
  notesList.innerHTML = "";
  notes.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n.content;
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = async () => {
      await fetch(`/api/notes/${n.id}`, { method: "DELETE" });
      loadNotes();
    };
    li.appendChild(btn);
    notesList.appendChild(li);
  });
}
saveNoteBtn.onclick = async () => {
  if (noteInput.value.trim()) {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: noteInput.value })
    });
    noteInput.value = "";
    loadNotes();
  }
};
loadNotes();
