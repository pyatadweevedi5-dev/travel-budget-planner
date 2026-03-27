function signup() {
  let user = document.getElementById("newUser").value;
  let pass = document.getElementById("newPass").value;
  if(!user || !pass){
    alert("please fill all fields");
    return;
  }

  localStorage.setItem(user, pass);
  alert("Account created!");
  window.location.href = "index.html";
}

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let storedPass = localStorage.getItem(user);

  if(pass === storedPass) {
    window.location.href = "planner.html";
  } else {
    alert("Invalid login");
  }
}

function goSignup(){
  window.location.href = "signup.html";
}

function goLogin(){
  window.location.href = "index.html";
}

function calculate() {
  let budget = +document.getElementById("budget").value;
  let days = +document.getElementById("days").value;
  let travel = +document.getElementById("travel").value;
  let hotel = +document.getElementById("hotel").value;
  let food = +document.getElementById("food").value;

  let hotelTotal = hotel * days;
  let foodTotal = food * days;

  let total = travel + hotelTotal + foodTotal;
  let remaining = budget - total;

  document.getElementById("result").innerHTML =
    `Total: ₹${total} <br> Remaining: ₹${remaining}`;

  drawChart(travel, hotelTotal, foodTotal);
}

function drawChart(travel, hotel, food) {
  const ctx = document.getElementById('chart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Travel', 'Hotel', 'Food'],
      datasets: [{
        data: [travel, hotel, food]
      }]
    }
  });
}

function toggleMode() {
  document.body.classList.toggle("dark");
}

function selectPlace(place) {
  document.getElementById("selectedPlace").innerText = "Selected: " + place;
}

  


function downloadPDF() {
  let result = document.getElementById("result").innerText;

  let content = "Travel Budget Report\n\n" + result;

  let blob = new Blob([content], { type: "text/plain" });

  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Travel_Report.txt";
  link.click();
}