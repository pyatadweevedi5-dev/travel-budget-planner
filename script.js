let chartInstance;

// SELECT DESTINATION
let selectedplace ="";
function selectPlace(place) {
  document.getElementById("selectedPlace").innerText =
    "Selected: " + place;
}

// CALCULATE
function calculate() {
  let budget = parseInt(document.getElementById("budget").value) || 0;
  let days = parseInt(document.getElementById("days").value) || 0;
  let travel = parseInt(document.getElementById("travel").value) || 0;
  let hotel = (parseInt(document.getElementById("hotel").value) || 0) * days;
  let food = (parseInt(document.getElementById("food").value) || 0) * days;

  let total = travel + hotel + food;
  let remaining = budget - total;

  document.getElementById("result").innerText =
    "Total: ₹" + total + " | Remaining: ₹" + remaining;

  drawChart(travel, hotel, food);
}

// CHART
function drawChart(travel, hotel, food) {
  const ctx = document.getElementById("chart");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Travel", "Hotel", "Food"],
      datasets: [{
        data: [travel, hotel, food]
      }]
    }
  });
}
function login() {
  let user = document.getElementById("username").value;

  if(user === "") {
    alert("Enter your name");
    return;
  }

  localStorage.setItem("user", user);
  window.location.href = "planner.html";
}

function fakeGoogle() {
  localStorage.setItem("user", "Google User");
  window.location.href = "planner.html";
}
