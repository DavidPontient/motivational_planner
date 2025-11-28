// ---------------- CLOCK -----------------
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#111';
    ctx.fill();

    var grad = ctx.createRadialGradient(0, 0, radius*0.95, 0, 0, radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#ff4d4d';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(var num=1; num<13; num++){
        var ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillStyle = "#fff";
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours()%12;
    var minute = now.getMinutes();
    var second = now.getSeconds();

    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);

    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// ---------------- CARD FLIP -----------------
$(function() {
    $("#card-1").flip({
        axis: "Y",
        trigger: "click",
        speed: 400
    });
});

// ---------------- QUOTES -----------------
const quotes = [
    {text:"You don't have to see the whole staircase, just take the first step.", author:"Martin Luther King Jr."},
    {text:"Do something today that your future self will thank you for.", author:"Unknown"},
    {text:"Success is not final, failure is not fatal: it is the courage to continue that counts.", author:"Winston Churchill"},
    {text:"Little by little, a little becomes a lot.", author:"Unknown"},
    {text:"Consistency is what transforms average into excellence.", author:"Unknown"}
];

document.getElementById("getQuote").addEventListener("click", function(){
    const random = quotes[Math.floor(Math.random()*quotes.length)];
    const block = document.getElementById("quoteBlock");
    block.innerHTML = `<p>${random.text}</p><cite>${random.author}</cite>`;
});

