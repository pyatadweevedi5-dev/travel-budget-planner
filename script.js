// ================= GLOBAL =================
let selectedPlace = null;


// ================= NAVIGATION =================
function startPlanning() {
  window.location.href = "signup.html";
}


// ================= AUTH =================

// Show Signup
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

// Show Login
function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

// Signup
document.getElementById("signupBtn")?.addEventListener("click", () => {
  const userId = document.getElementById("userId").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!userId || !password) {
    alert("Enter all details");
    return;
  }

  localStorage.setItem(userId, password);
  alert("Signup successful!");
  showLogin();
});

// Login
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const userId = document.getElementById("loginUserId").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const stored = localStorage.getItem(userId);

  if (!stored || stored !== password) {
    alert("Invalid login");
    return;
  }

  alert("Login successful!");
  window.location.href = "planner.html";
});


// ================= DATA =================
const places = [
  {
    name: "Shimla",
    category: "mountain",
    img: "https://images.unsplash.com/photo-1597074866923-dc0589150358",
    food: [{ name: "Siddu" }, { name: "Madra" }],
    hotel: 1200,
    travel: 3000,
    foodCost: 400
  },
  {
    name: "Manali",
    category: "mountain",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    food: [{ name: "Thukpa" }, { name: "Momos" }],
    hotel: 1500,
    travel: 3500,
    foodCost: 500
  },
  {
    name: "Darjeeling",
    category: "mountain",
    img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
    food: [{ name: "Momos" }, { name: "Thukpa" }],
    hotel: 1200,
    travel: 3000,
    foodCost: 400
  },
  {
    name: "Goa",
    category: "beach",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    food: [{ name: "Fish Curry" }, { name: "Prawn Fry" }],
    hotel: 1800,
    travel: 2500,
    foodCost: 600
  },
  {
    name: "Taj Mahal",
    category: "city",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada",
    food: [{ name: "Petha" }, { name: "Chaat" }],
    hotel: 1000,
    travel: 2000,
    foodCost: 300
  },
  {
    name: "Varanasi",
    category: "city",
    img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc",
    food: [{ name: "Kachori" }, { name: "Lassi" }],
    hotel: 800,
    travel: 1500,
    foodCost: 300
  },
  {
    name: "Munnar",
    category: "mountain",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    food: [{ name: "Appam" }, { name: "Sadya" }],
    hotel: 1400,
    travel: 3000,
    foodCost: 400
  },
  {
    name: "Coorg",
    category: "mountain",
    img: "https://images.unsplash.com/photo-1597074866923-dc0589150358",
    food: [{ name: "Pandi Curry" }, { name: "Kadumbuttu" }],
    hotel: 1300,
    travel: 2800,
    foodCost: 400
  }
];


// ================= LOAD PLACES =================
function loadPlaces(list = places) {
  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}">
      <p>${p.name}</p>
    `;

    card.onclick = () => showDetails(p);

    grid.appendChild(card);
  });
}


// ================= SHOW DETAILS =================
function showDetails(p) {
  selectedPlace = p;

  const details = document.getElementById("details");
  if (!details) return;

  const perDay = p.hotel + p.foodCost;

  details.innerHTML = `
    <h2>${p.name}</h2>

    <h3>🍽 Food</h3>
    <div class="place-grid">
      ${p.food.map(f => `
        <div class="place-card">
          <img src="https://source.unsplash.com/300x200/?food,${f.name}">
          <p>${f.name}</p>
        </div>
      `).join("")}
    </div>

    <h3>💰 Cost Breakdown</h3>
    <p>✈ Travel: ₹${p.travel}</p>
    <p>🏨 Hotel/day: ₹${p.hotel}</p>
    <p>🍽 Food/day: ₹${p.foodCost}</p>
    <p>📊 Per day: ₹${perDay}</p>
  `;
}


// ================= SEARCH =================
document.getElementById("search")?.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = places.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  loadPlaces(filtered);
});


// ================= FILTER =================
function filterPlaces(type) {
  if (type === "all") return loadPlaces();

  const filtered = places.filter(p => p.category === type);
  loadPlaces(filtered);
}


// ================= CALCULATE =================
function calculateTrip() {
  const budget = +document.getElementById("budget")?.value;
  const days = +document.getElementById("days")?.value;

  if (!selectedPlace) {
    return alert("Select a place first");
  }

  const perDay = selectedPlace.hotel + selectedPlace.foodCost;
  const total = selectedPlace.travel + (perDay * days);
  const remaining = budget - total;

  document.getElementById("tripResult").innerText =
    `Total: ₹${total} | Remaining: ₹${remaining}`;
}


// ================= SUGGEST DAYS =================
function suggestDays() {
  const budget = +document.getElementById("budget")?.value;

  if (!selectedPlace) return;

  const perDay = selectedPlace.hotel + selectedPlace.foodCost;
  const days = Math.floor((budget - selectedPlace.travel) / perDay);

  document.getElementById("tripResult").innerText =
    `You can stay ${days} days in ${selectedPlace.name}`;
}


// ================= INIT =================
loadPlaces();