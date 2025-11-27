// Frontend app.js - talks to backend at API_BASE or falls back to localStorage
const API_BASE = (window.API_BASE ? window.API_BASE : 'http://localhost:3000/api');

// safeFetch with timeout
async function safeFetch(url, opts = {}, timeout = 7000){
  const controller = new AbortController();
  const id = setTimeout(()=>controller.abort(), timeout);
  try{
    const res = await fetch(url, {...opts, signal: controller.signal});
    clearTimeout(id);
    return res;
  }catch(e){
    clearTimeout(id);
    throw e;
  }
}

/* ---------------- QUOTES ---------------- */
const quoteEl = document.getElementById('quote');
const newQuoteBtn = document.getElementById('newQuote');
const copyQuoteBtn = document.getElementById('copyQuote');

async function loadQuote(){
  quoteEl.textContent = 'Loading quote...';
  try {
    const r = await safeFetch(`${API_BASE}/quotes`);
    if(!r.ok) throw new Error('bad');
    const data = await r.json();
    quoteEl.textContent = `"${data.text}"${data.author ? ' — ' + data.author : ''}`;
  } catch (err) {
    try {
      const local = await fetch('data/quotes.json').then(r=>r.json());
      const pick = local[Math.floor(Math.random()*local.length)];
      quoteEl.textContent = `"${pick.text}" — ${pick.author}`;
    } catch (e) {
      quoteEl.textContent = 'Unable to load quotes 😔';
    }
  }
}
newQuoteBtn.addEventListener('click', loadQuote);
copyQuoteBtn?.addEventListener('click', ()=> navigator.clipboard?.writeText(quoteEl.textContent || ''));

/* ---------------- HELPERS ---------------- */
function localLoad(key){ return JSON.parse(localStorage.getItem(key) || '[]'); }
function localSave(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

/* ---------------- SUBJECTS ---------------- */
const subjectInput = document.getElementById('subjectInput');
const subjectHours = document.getElementById('subjectHours');
const addSubjectBtn = document.getElementById('addSubject');
const subjectList = document.getElementById('subjectList');

async function fetchSubjectsFromServer(){
  const r = await safeFetch(`${API_BASE}/subjects`);
  if(!r.ok) throw new Error('server error');
  return r.json();
}
function createSubjectElement(s){
  const el = document.createElement('div'); el.className='item';
  const meta = document.createElement('div'); meta.innerHTML = `<strong>${escapeHtml(s.title)}</strong><div class="meta">${s.hours || ''} hrs/day</div>`;
  const actions = document.createElement('div'); actions.className='actions';
  const del = document.createElement('button'); del.className='delete-btn'; del.textContent='Delete';
  del.addEventListener('click', ()=> deleteSubject(s));
  actions.appendChild(del);
  el.appendChild(meta); el.appendChild(actions);
  return el;
}

async function renderSubjects(){
  subjectList.innerHTML = 'Loading...';
  try {
    const arr = await fetchSubjectsFromServer();
    subjectList.innerHTML = '';
    arr.forEach(s => subjectList.appendChild(createSubjectElement(s)));
  } catch {
    const arr = localLoad('subjects');
    subjectList.innerHTML = '';
    arr.forEach((s,i) => subjectList.appendChild(createSubjectElement({...s, id:i, _local:true})));
  }
}

async function addSubject(){
  const title = subjectInput.value.trim(); const hours = parseFloat(subjectHours.value) || '';
  if(!title) return alert('Enter a subject name');
  try {
    const res = await safeFetch(`${API_BASE}/subjects`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({title,hours})
    });
    if(!res.ok) throw new Error('server');
    subjectInput.value=''; subjectHours.value=''; renderSubjects();
  } catch {
    const arr = localLoad('subjects'); arr.push({title,hours}); localSave('subjects',arr); subjectInput.value=''; subjectHours.value=''; renderSubjects();
  }
}
addSubjectBtn.addEventListener('click', addSubject);

async function deleteSubject(s){
  if(!confirm('Delete this subject?')) return;
  if(s._local){
    const arr = localLoad('subjects'); arr.splice(s.id,1); localSave('subjects',arr); renderSubjects(); return;
  }
  try {
    const r = await safeFetch(`${API_BASE}/subjects/${s._id || s.id}`, {method:'DELETE'});
    if(!r.ok) throw new Error('delete fail');
    renderSubjects();
  } catch { alert('Unable to delete on server.'); }
}

/* ---------------- SESSIONS ---------------- */
const sessionDate = document.getElementById('sessionDate');
const sessionStart = document.getElementById('sessionStart');
const sessionEnd = document.getElementById('sessionEnd');
const sessionInput = document.getElementById('sessionInput');
const addSessionBtn = document.getElementById('addSession');
const sessionList = document.getElementById('sessionList');

async function fetchSessionsFromServer(){
  const r = await safeFetch(`${API_BASE}/sessions`);
  if(!r.ok) throw new Error('server');
  return r.json();
}
function createSessionElement(s){
  const el = document.createElement('div'); el.className='item';
  const meta = document.createElement('div'); meta.innerHTML = `<strong>${escapeHtml(s.desc || s.description || 'No title')}</strong><div class="meta">📅 ${s.date} | ⏰ ${s.start} - ${s.end}</div>`;
  const actions = document.createElement('div'); actions.className='actions';
  const del = document.createElement('button'); del.className='delete-btn'; del.textContent='Delete';
  del.addEventListener('click', ()=> deleteSession(s));
  actions.appendChild(del);
  el.appendChild(meta); el.appendChild(actions);
  return el;
}
async function renderSessions(){
  sessionList.innerHTML = 'Loading...';
  try {
    const arr = await fetchSessionsFromServer();
    sessionList.innerHTML = '';
    arr.forEach(s => sessionList.appendChild(createSessionElement(s)));
  } catch {
    const arr = localLoad('sessions'); sessionList.innerHTML=''; arr.forEach((s,i)=> sessionList.appendChild(createSessionElement({...s,id:i,_local:true})));
  }
}

async function addSession(){
  const date = sessionDate.value, start = sessionStart.value, end = sessionEnd.value, desc = sessionInput.value.trim();
  if(!date || !start || !end || !desc) return alert('Complete date/time & description');
  const payload = {date,start,end,desc};
  try {
    const res = await safeFetch(`${API_BASE}/sessions`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(!res.ok) throw new Error('server');
    sessionDate.value=''; sessionStart.value=''; sessionEnd.value=''; sessionInput.value=''; renderSessions();
  } catch {
    const arr = localLoad('sessions'); arr.push(payload); localSave('sessions',arr); renderSessions();
  }
}
addSessionBtn.addEventListener('click', addSession);

async function deleteSession(s){
  if(!confirm('Delete this session?')) return;
  if(s._local){ const arr = localLoad('sessions'); arr.splice(s.id,1); localSave('sessions',arr); renderSessions(); return; }
  try {
    const r = await safeFetch(`${API_BASE}/sessions/${s._id || s.id}`, {method:'DELETE'});
    if(!r.ok) throw new Error('delete fail'); renderSessions();
  } catch { alert('Unable to delete on server.'); }
}

/* ---------------- NOTES (local-only) ---------------- */
const noteTitle = document.getElementById('noteTitle');
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNote');
const clearNotesBtn = document.getElementById('clearNotes');
const notesList = document.getElementById('notesList');
const noteStatus = document.getElementById('noteStatus');

function renderNotesLocal(){
  const arr = localLoad('notes'); notesList.innerHTML = '';
  arr.forEach((n,i)=> {
    const el = document.createElement('div'); el.className='item';
    const meta = document.createElement('div'); meta.innerHTML = `<strong>${escapeHtml(n.title || 'Untitled')}</strong><div class="meta">${escapeHtml(n.body)}</div>`;
    const actions = document.createElement('div'); actions.className='actions';
    const del = document.createElement('button'); del.className='delete-btn'; del.textContent='Delete';
    del.addEventListener('click', ()=>{ if(confirm('Delete note?')){ arr.splice(i,1); localSave('notes',arr); renderNotesLocal(); }});
    actions.appendChild(del); el.appendChild(meta); el.appendChild(actions); notesList.appendChild(el);
  });
}
saveNoteBtn.addEventListener('click', ()=>{
  const arr = localLoad('notes'); arr.unshift({title: noteTitle.value.trim(), body: noteInput.value.trim(), created: new Date().toISOString()});
  localSave('notes',arr); noteTitle.value=''; noteInput.value=''; noteStatus.textContent='Saved!'; setTimeout(()=>noteStatus.textContent='',1500); renderNotesLocal();
});
clearNotesBtn.addEventListener('click', ()=>{ if(confirm('Clear all notes?')){ localSave('notes',[]); renderNotesLocal(); }});

/* ---------------- INIT ---------------- */
async function init(){
  await loadQuote();
  await renderSubjects();
  await renderSessions();
  renderNotesLocal();
  if('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
}
init();
