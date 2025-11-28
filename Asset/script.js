// ----------------------- Todo List Variables ----------------------- //
var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

// Create an array to hold todos
var todos = [];

// ----------------------- Initialize ----------------------- //
init();
$("#points").text(localStorage.clickcount || 0);

// ----------------------- Todo List Functions ----------------------- //
function init() {
  var storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos) todos = storedTodos;
  renderTodos();
}

function storeTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  todos.forEach((todo, i) => {
    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var deleteButton = document.createElement("button");
    deleteButton.className = "fa fa-close btn btn-danger btn-lg";

    var countdownButton = document.createElement("button");
    countdownButton.className = "fa fa-hourglass-1 btn btn-primary btn-lg";

    var completeButton = document.createElement("button");
    completeButton.className = "fa fa-check-square-o btn btn-success btn-lg";

    li.appendChild(deleteButton);
    li.appendChild(countdownButton);
    li.appendChild(completeButton);

    todoList.appendChild(li);
  });
}

// ----------------------- Event Listeners ----------------------- //
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var todoText = todoInput.value.trim();
  if (!todoText) return;

  todos.push(todoText);
  todoInput.value = "";

  storeTodos();
  renderTodos();
});

todoList.addEventListener("click", function (event) {
  var element = event.target;
  var index = element.parentElement.getAttribute("data-index");

  if (element.classList.contains("fa-close")) {
    todos.splice(index, 1);
    storeTodos();
    renderTodos();
  } else if (element.classList.contains("fa-hourglass-1")) {
    startTimer(5, "#time"); // Start 5-minute timer
  } else if (element.classList.contains("fa-check-square-o")) {
    todos.splice(index, 1);
    clickCounter();
    storeTodos();
    renderTodos();
  }
});

// ----------------------- Click Counter ----------------------- //
function clickCounter() {
  if (typeof Storage !== "undefined") {
    localStorage.clickcount = (Number(localStorage.clickcount) || 0) + 1;
    $("#points").text(localStorage.clickcount);
  }
}

// ----------------------- Countdown Timer ----------------------- //
function startTimer(minutes = 5, displaySelector = "#time") {
  var duration = moment.duration({ minutes, seconds: 0 });
  var display = $(displaySelector);

  var timer = setInterval(function () {
    var min = duration.minutes();
    var sec = duration.seconds();

    // Format with leading zeros
    var formattedMin = min < 10 ? "0" + min : min;
    var formattedSec = sec < 10 ? "0" + sec : sec;
    display.text(formattedMin + ":" + formattedSec);

    duration = moment.duration(duration.asSeconds() - 1, "seconds");

    if (duration.asSeconds() <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

$("#timerButton").on("click", function () {
  startTimer(5, "#time"); // Default 5-minute timer
});

// ----------------------- Quote API ----------------------- //
var queryURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random?";
var quoteText = $("#quote");

$("#motivationButton").click(function () {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    quoteText.text(`${response.quote.quoteText} - ${response.quote.quoteAuthor}`);
  });
});

// ----------------------- Images API ----------------------- //
var randomImageNumber = Math.floor(Math.random() * 20);
var imageToDisplay = $("#motivationImage");
var pixelKey = "17203059-4d033efc49ecc457a7083a895";
var imgUrl = `https://pixabay.com/api/?key=${pixelKey}&category=places&image_type=photo&orientation=horizontal`;

function getImages() {
  $.ajax({
    url: imgUrl,
    method: "GET",
  }).then(function (imageData) {
    if (imageData.hits && imageData.hits[randomImageNumber]) {
      imageToDisplay.attr("src", imageData.hits[randomImageNumber].webformatURL);
    }
  });
}

getImages();

// ----------------------- Second Images API (Test) ----------------------- //
var secondImageUrl = "https://api.unsplash.com/photos/random?client_id=yeduKBA2kZ723vugi0TIdMCjX0EG523F5QhrhuwlLdg";

function getNewImages() {
  $.ajax({
    url: secondImageUrl,
    method: "GET",
    scope: "public",
  }).then(function (upData) {
    console.log("working!");
    console.log(upData);
  });
}
