const tasksContainer = document.getElementById('tasksContainer');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');

let tasks = [];

function renderTasks(){
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index)=>{
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <h4>${task.name}</h4>
            <p id="timer-${index}">00:00:00</p>
            <button onclick="startTimer(${index})" class="btn btn-primary btn-sm">Start</button>
            <button onclick="stopTimer(${index})" class="btn btn-danger btn-sm">Stop</button>
        `;
        tasksContainer.appendChild(taskDiv);
    });
}

addTaskBtn.addEventListener('click', ()=>{
    if(taskInput.value.trim() === '') return;
    tasks.push({name: taskInput.value, time: 0, interval:null});
    taskInput.value='';
    renderTasks();
});

function startTimer(index){
    if(tasks[index].interval) return;
    tasks[index].interval = setInterval(()=>{
        tasks[index].time++;
        const h = Math.floor(tasks[index].time/3600).toString().padStart(2,'0');
        const m = Math.floor((tasks[index].time%3600)/60).toString().padStart(2,'0');
        const s = (tasks[index].time%60).toString().padStart(2,'0');
        document.getElementById(`timer-${index}`).textContent = `${h}:${m}:${s}`;
    },1000);
}

function stopTimer(index){
    clearInterval(tasks[index].interval);
    tasks[index].interval = null;
}
