// Todo List Functionality
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-text");
const todoList = document.getElementById("todo-list");
const pointsDisplay = document.getElementById("points");
const todoCountDisplay = document.getElementById("todo-count");

let points = 0;

todoForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText === "") return;

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.textContent = todoText;

  const completeButton = document.createElement("button");
  completeButton.className = "btn btn-sm btn-danger";
  completeButton.innerHTML = '<i class="fa fa-check"></i>';
  completeButton.onclick = () => {
    li.remove();
    points++;
    updatePoints();
  };

  li.appendChild(completeButton);
  todoList.appendChild(li);
  todoInput.value = "";
  updateTodoCount();
});

function updatePoints() {
  pointsDisplay.textContent = points;
}

function updateTodoCount() {
  todoCountDisplay.textContent = todoList.children.length;
}

// Timer Functionality
let timer;
let timeLeft = 300; // 5 minutes

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up!");
      return;
    }
    timeLeft--;
    displayTime();
  }, 1000);
}

function displayTime() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  document.getElementById("time").textContent = `${minutes}:${seconds}`;
}

// Motivation Button
const motivationButton = document.getElementById("motivationButton");
const quoteText = document.getElementById("quote");
const motivationImage = document.getElementById("motivationImage");

motivationButton.addEventListener("click", async () => {
  try {
    // Fetch random quote
    const quoteRes = await fetch("https://quote-garden.onrender.com/api/v3/quotes/random");
    const quoteData = await quoteRes.json();
    quoteText.textContent = quoteData.data[0].quoteText;

    // Fetch random image
    const imgRes = await fetch("https://pixabay.com/api/?key=YOUR_PIXABAY_API_KEY&q=motivation&image_type=photo&orientation=horizontal");
    const imgData = await imgRes.json();
    if (imgData.hits.length > 0) {
      motivationImage.src = imgData.hits[0].webformatURL;
    }
  } catch (error) {
    quoteText.textContent = "Stay motivated!";
  }
});
