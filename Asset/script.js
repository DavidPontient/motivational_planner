// -------------------- Todo List with Individual Timers --------------------
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-text");
const todoList = document.getElementById("todo-list");
const pointsDisplay = document.getElementById("points");
const todoCountDisplay = document.getElementById("todo-count");

let points = 0;

// Add Todo
todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className = "list-group-item";

  // Timer per todo (default 5 minutes)
  let timer = null;
  let timeLeft = 300;

  const timerDisplay = document.createElement("span");
  timerDisplay.textContent = "05:00";
  timerDisplay.style.marginRight = "10px";

  const startBtn = document.createElement("button");
  startBtn.className = "btn btn-sm btn-danger";
  startBtn.textContent = "Start";

  const completeBtn = document.createElement("button");
  completeBtn.className = "btn btn-sm btn-danger";
  completeBtn.innerHTML = '<i class="fa fa-check"></i>';

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "todo-buttons";
  buttonContainer.appendChild(timerDisplay);
  buttonContainer.appendChild(startBtn);
  buttonContainer.appendChild(completeBtn);

  li.textContent = text + " ";
  li.appendChild(buttonContainer);
  todoList.appendChild(li);

  // Timer Function
  startBtn.onclick = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert(`Task "${text}" timer finished! +5 points`);
        points += 5;
        updatePoints();
        timerDisplay.textContent = "00:00";
      } else {
        timeLeft--;
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        const secs = String(timeLeft % 60).padStart(2, "0");
        timerDisplay.textContent = `${mins}:${secs}`;
      }
    }, 1000);
  };

  // Complete button
  completeBtn.onclick = () => {
    clearInterval(timer);
    li.remove();
    points++;
    updatePoints();
    updateTodoCount();
  };

  todoInput.value = "";
  updateTodoCount();
});

// Update Points
function updatePoints() {
  pointsDisplay.textContent = points;
}

// Update Todo Count
function updateTodoCount() {
  todoCountDisplay.textContent = todoList.children.length;
}

// -------------------- Motivation --------------------
const motivationButton = document.getElementById("motivationButton");
const quoteText = document.getElementById("quote");
const motivationImage = document.getElementById("motivationImage");

motivationButton.addEventListener("click", async () => {
  try {
    const quoteRes = await fetch("https://quote-garden.onrender.com/api/v3/quotes/random");
    const quoteData = await quoteRes.json();
    quoteText.textContent = quoteData.data[0].quoteText;

    const imgRes = await fetch("https://pixabay.com/api/?key=YOUR_PIXABAY_API_KEY&q=motivation&image_type=photo&orientation=horizontal");
    const imgData = await imgRes.json();
    if (imgData.hits.length > 0) motivationImage.src = imgData.hits[0].webformatURL;
  } catch (err) {
    quoteText.textContent = "Stay motivated!";
  }
});
